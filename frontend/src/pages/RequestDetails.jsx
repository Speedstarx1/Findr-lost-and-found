"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getRequestById, approveRequest, rejectRequest } from "../services/requestService"
import styles from "./RequestDetails.module.css"

const RequestDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getRequestById(id)
        setRequest(data)
      } catch (err) {
        console.error("Error fetching request:", err)
        setError("Failed to load request details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [id])

  const handleApprove = async () => {
    if (window.confirm("Are you sure you want to approve this request?")) {
      try {
        setProcessing(true)
        const updatedRequest = await approveRequest(id)
        setRequest(updatedRequest)
      } catch (err) {
        console.error("Error approving request:", err)
        setError("Failed to approve request. Please try again.")
      } finally {
        setProcessing(false)
      }
    }
  }

  const handleReject = async () => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      try {
        setProcessing(true)
        const updatedRequest = await rejectRequest(id)
        setRequest(updatedRequest)
      } catch (err) {
        console.error("Error rejecting request:", err)
        setError("Failed to reject request. Please try again.")
      } finally {
        setProcessing(false)
      }
    }
  }

  if (loading) {
    return <div>Loading request details...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  if (!request) {
    return <div className={styles.error}>Request not found</div>
  }

  const isReportOwner = user?.id === request.report.user.id
  const isRequester = user?.id === request.requester.id
  const isPending = request.status === "PENDING"

  return (
    <div className={styles.requestDetailsPage}>
      <div className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link to="/my-requests">My Requests</Link> / Request Details
        </div>
      </div>

      <div className={styles.requestCard}>
        <div className={styles.requestHeader}>
          <div className={styles.requestMeta}>
            <div className={styles.requestType} data-type={request.type}>
              {request.type}
            </div>
            <div className={styles.requestStatus} data-status={request.status}>
              {request.status}
            </div>
          </div>
          <h1 className={styles.requestTitle}>{request.report.items.map((item) => item.name).join(", ")}</h1>
        </div>

        <div className={styles.requestContent}>
          <div className={styles.requestSection}>
            <h2>Request Details</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Request Type</span>
                <span className={styles.detailValue}>{request.type}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Status</span>
                <span className={styles.detailValue}>{request.status}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Requested By</span>
                <span className={styles.detailValue}>{request.requester.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact</span>
                <span className={styles.detailValue}>{request.requester.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Requested On</span>
                <span className={styles.detailValue}>{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>
              {request.resolvedAt && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Resolved On</span>
                  <span className={styles.detailValue}>{new Date(request.resolvedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.requestSection}>
            <h2>Note</h2>
            <p className={styles.note}>{request.note}</p>
          </div>

          <div className={styles.requestSection}>
            <h2>Report Information</h2>
            <div className={styles.reportCard}>
              <div className={styles.reportHeader}>
                <div className={styles.reportType} data-type={request.report.type}>
                  {request.report.type}
                </div>
                <div className={styles.reportStatus} data-status={request.report.status}>
                  {request.report.status}
                </div>
              </div>
              <div className={styles.reportContent}>
                <h3>{request.report.items.map((item) => item.name).join(", ")}</h3>
                <div className={styles.reportDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Location</span>
                    <span className={styles.detailValue}>{request.report.location}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      {request.report.type === "LOST" ? "Last Seen" : "Found On"}
                    </span>
                    <span className={styles.detailValue}>{new Date(request.report.lastSeen).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Reported By</span>
                    <span className={styles.detailValue}>{request.report.user.name}</span>
                  </div>
                </div>
                <div className={styles.reportDescription}>
                  <p>{request.report.description.substring(0, 150)}...</p>
                </div>
                <div className={styles.viewReportLink}>
                  <Link to={`/reports/${request.report.id}`}>View Full Report</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isReportOwner && isPending && (
          <div className={styles.requestActions}>
            <p>This user is requesting to {request.type === "CLAIM" ? "claim" : "return"} your item.</p>
            <div className={styles.actionButtons}>
              <button className={styles.rejectButton} onClick={handleReject} disabled={processing}>
                {processing ? "Processing..." : "Reject Request"}
              </button>
              <button className={styles.approveButton} onClick={handleApprove} disabled={processing}>
                {processing ? "Processing..." : "Approve Request"}
              </button>
            </div>
          </div>
        )}

        {isRequester && request.status === "APPROVED" && (
          <div className={styles.requestActions}>
            <p className={styles.successMessage}>
              Your request has been approved! Please contact the item owner to arrange a meeting.
            </p>
            <div className={styles.contactInfo}>
              <h3>Contact Information</h3>
              <p>
                <strong>Name:</strong> {request.report.user.name}
              </p>
              <p>
                <strong>Email:</strong> {request.report.user.email}
              </p>
              <p>
                <strong>Phone:</strong> {request.report.user.telephoneNo}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestDetails
