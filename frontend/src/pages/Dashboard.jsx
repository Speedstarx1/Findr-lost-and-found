"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getRecentReports } from "../services/reportService"
import { getMyRequests } from "../services/requestService"
import { getAllReports } from "../services/reportService"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  
  const [recentReports, setRecentReports] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [stats, setStats] = useState({
    totalLost: 0,
    totalFound: 0,
    totalClosed: 0,
    pendingRequests: 0,
  })
  const [loading, setLoading] = useState(true)

  const { user } = useContext(AuthContext)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const reports = await getAllReports()
        const reports = await getRecentReports()
        const requests = await getMyRequests()

        setRecentReports(reports.slice(0, 5))

        const pendingReqs = requests.filter((req) => req.status === "PENDING")
        setPendingRequests(pendingReqs.slice(0, 5))

        setStats({
          totalLost: reports.filter((report) => report.type === "LOST").length,
          totalFound: reports.filter((report) => report.type === "FOUND").length,
          totalClosed: reports.filter((report) => report.status === "CLOSED").length,
          pendingRequests: pendingReqs.length,
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading || !user) {
  return <div>Loading dashboard...</div>;
}

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h1>Welcome back, {user?.name}</h1>
        <p>Here's what's happening with your lost and found items</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Lost Items</h3>
          <p className={styles.statNumber}>{stats.totalLost}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Found Items</h3>
          <p className={styles.statNumber}>{stats.totalFound}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Closed Reports</h3>
          <p className={styles.statNumber}>{stats.totalClosed}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Requests</h3>
          <p className={styles.statNumber}>{stats.pendingRequests}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <Link to="/report-item" className={styles.actionButton}>
          Report Lost Item
        </Link>
        <Link to="/report-item?type=found" className={styles.actionButton}>
          Report Found Item
        </Link>
        <Link to="/search" className={styles.actionButton}>
          Search Items
        </Link>
      </div>

      <div className={styles.recentActivity}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Recent Reports</h2>
            <Link to="/my-reports" className={styles.viewAll}>
              View All
            </Link>
          </div>
          {recentReports.length > 0 ? (
            <div className={styles.reportsList}>
              {recentReports.map((report) => (
                <div key={report.id} className={styles.reportCard}>
                  <div className={styles.reportType} data-type={report.type}>
                    {report.type}
                  </div>
                  <div className={styles.reportInfo}>
                    <h3>{report.items.map((item) => item.name).join(", ")}</h3>
                    <p>{report.location}</p>
                    <p className={styles.date}>{new Date(report.lastSeen).toLocaleDateString()}</p>
                  </div>
                  <Link to={`/reports/${report.id}`} className={styles.viewButton}>
                    View
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No recent reports</p>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Pending Requests</h2>
            <Link to="/my-requests" className={styles.viewAll}>
              View All
            </Link>
          </div>
          {pendingRequests.length > 0 ? (
            <div className={styles.requestsList}>
              {pendingRequests.map((request) => (
                <div key={request.id} className={styles.requestCard}>
                  <div className={styles.requestType} data-type={request.type}>
                    {request.type}
                  </div>
                  <div className={styles.requestInfo}>
                    <h3>{request.report.items.map((item) => item.name).join(", ")}</h3>
                    <p>From: {request.requester.name}</p>
                    <p className={styles.date}>{new Date(request.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Link to={`/requests/${request.id}`} className={styles.viewButton}>
                    View
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No pending requests</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
