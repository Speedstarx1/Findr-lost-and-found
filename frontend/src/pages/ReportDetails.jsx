"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getReportById, closeReport } from "../services/reportService"
import { createRequest } from "../services/requestService"
import styles from "./ReportDetails.module.css"

const ReportDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestType, setRequestType] = useState("")
  const [requestNote, setRequestNote] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [requestError, setRequestError] = useState(null)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportById(id)
        setReport(data)
      } catch (err) {
        console.error("Error fetching report:", err)
        setError("Failed to load report details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [id])

  const handleCloseReport = async () => {
    if (window.confirm("Are you sure you want to close this report?")) {
      try {
        setLoading(true)
        const updatedReport = await closeReport(id)
        setReport(updatedReport)
      } catch (err) {
        console.error("Error closing report:", err)
        setError("Failed to close report. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleRequestSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setRequestError(null)

    try {
      const requestData = {
        reportId: id,
        type: requestType,
        note: requestNote,
      }

      await createRequest(requestData)
      setShowRequestForm(false)
      alert("Your request has been submitted successfully!")
    } catch (err) {
      console.error("Error submitting request:", err)
      setRequestError("Failed to submit request. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div>Loading report details...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  if (!report) {
    return <div className={styles.error}>Report not found</div>
  }

  const isOwner = user?.id === report.user.id
  const canMakeRequest = !isOwner && report.status === "OPEN"

  return (
    <div className={styles.reportDetailsPage}>
      <div className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link to="/search">Search</Link> / Report Details
        </div>
        <div className={styles.headerActions}>
          {isOwner && report.status === "OPEN" && (
            <button className={styles.closeButton} onClick={handleCloseReport}>
              Close Report
            </button>
          )}
        </div>
      </div>

      <div className={styles.reportCard}>
        <div className={styles.reportHeader}>
          <div className={styles.reportMeta}>
            <div className={styles.reportType} data-type={report.type}>
              {report.type}
            </div>
            <div className={styles.reportStatus} data-status={report.status}>
              {report.status}
            </div>
          </div>
          <h1 className={styles.reportTitle}>{report.items.map((item) => item.name).join(", ")}</h1>
        </div>

        <div className={styles.reportContent}>
          <div className={styles.reportSection}>
            <h2>Details</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{report.location}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{report.type === "LOST" ? "Last Seen" : "Found On"}</span>
                <span className={styles.detailValue}>
                  {new Date(report.lastSeen).toLocaleDateString()} at {new Date(report.lastSeen).toLocaleTimeString()}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Reported By</span>
                <span className={styles.detailValue}>{report.user.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact</span>
                <span className={styles.detailValue}>{report.user.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Reported On</span>
                <span className={styles.detailValue}>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className={styles.reportSection}>
            <h2>Description</h2>
            <p className={styles.description}>{report.description}</p>
          </div>

          <div className={styles.reportSection}>
            <h2>Items</h2>
            <ul className={styles.itemsList}>
              {report.items.map((item, index) => (
                <li key={index} className={styles.itemCard}>
                  <span className={styles.itemName}>{item.name}</span>
                  {item.status && (
                    <span className={styles.itemStatus} data-status={item.status}>
                      {item.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {canMakeRequest && (
          <div className={styles.reportActions}>
            {!showRequestForm ? (
              <>
                <p>Is this your item or do you know who it belongs to?</p>
                <div className={styles.actionButtons}>
                  {report.type === "FOUND" && (
                    <button
                      className={styles.actionButton}
                      onClick={() => {
                        setRequestType("CLAIM")
                        setShowRequestForm(true)
                      }}
                    >
                      Claim This Item
                    </button>
                  )}
                  {report.type === "LOST" && (
                    <button
                      className={styles.actionButton}
                      onClick={() => {
                        setRequestType("RETURN")
                        setShowRequestForm(true)
                      }}
                    >
                      Return This Item
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.requestForm}>
                <h2>{requestType === "CLAIM" ? "Claim This Item" : "Return This Item"}</h2>
                <form onSubmit={handleRequestSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="note">
                      {requestType === "CLAIM"
                        ? "Proof of Ownership / Additional Details"
                        : "Where did you find it? / Additional Details"}
                    </label>
                    <textarea
                      id="note"
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      rows={4}
                      required
                      placeholder={
                        requestType === "CLAIM"
                          ? "Please provide proof of ownership or any details that can help verify your claim..."
                          : "Please provide details about where you found the item and any other relevant information..."
                      }
                    />
                  </div>

                  {requestError && <div className={styles.error}>{requestError}</div>}

                  <div className={styles.formActions}>
                    <button type="button" className={styles.cancelButton} onClick={() => setShowRequestForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className={styles.submitButton} disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportDetails
