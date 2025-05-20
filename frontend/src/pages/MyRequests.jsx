"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getMyRequests } from "../services/requestService"
import styles from "./MyRequests.module.css"

const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("ALL")

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyRequests()
        setRequests(data)
      } catch (err) {
        console.error("Error fetching requests:", err)
        setError("Failed to load requests. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const filteredRequests = filter === "ALL" ? requests : requests.filter((request) => request.status === filter)

  if (loading) {
    return <div>Loading requests...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.myRequestsPage}>
      <div className={styles.header}>
        <h1>My Requests</h1>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === "ALL" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("ALL")}
        >
          All Requests
        </button>
        <button
          className={`${styles.filterButton} ${filter === "PENDING" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("PENDING")}
        >
          Pending
        </button>
        <button
          className={`${styles.filterButton} ${filter === "APPROVED" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("APPROVED")}
        >
          Approved
        </button>
        <button
          className={`${styles.filterButton} ${filter === "REJECTED" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("REJECTED")}
        >
          Rejected
        </button>
      </div>

      {filteredRequests.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No requests found</p>
          <Link to="/search" className={styles.searchButton}>
            Search for items
          </Link>
        </div>
      ) : (
        <div className={styles.requestsList}>
          {filteredRequests.map((request) => (
            <div key={request.id} className={styles.requestCard}>
              <div className={styles.requestHeader}>
                <div className={styles.requestType} data-type={request.type}>
                  {request.type}
                </div>
                <div className={styles.requestStatus} data-status={request.status}>
                  {request.status}
                </div>
              </div>

              <div className={styles.requestContent}>
                <h3 className={styles.requestTitle}>{request.report.items.map((item) => item.name).join(", ")}</h3>

                <div className={styles.requestDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Report Type:</span>
                    <span>{request.report.type}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Location:</span>
                    <span>{request.report.location}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Reported By:</span>
                    <span>{request.report.user.name}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Requested On:</span>
                    <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className={styles.requestNote}>
                  <h4>Your Note:</h4>
                  <p>{request.note}</p>
                </div>
              </div>

              <div className={styles.requestActions}>
                <Link to={`/requests/${request.id}`} className={styles.viewButton}>
                  View Details
                </Link>
                <Link to={`/reports/${request.report.id}`} className={styles.viewReportButton}>
                  View Report
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyRequests
