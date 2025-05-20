"use client"
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getMyReports } from "../services/reportService"
import styles from "./MyReports.module.css"

export default function  MyReports() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (authLoading) return;
console.log("User:", user);
    const fetchReports = async () => {
      console.log("Fetching reports for user:", user);
      if (!user?.id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyReports(user.id);
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user, authLoading]);



  const filteredReports = filter === "ALL" ? reports : reports.filter((report) => report.type === filter)

  if (loading) {
    return <div>Loading reports...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.myReportsPage}>
      <div className={styles.header}>
        <h1>My Reports</h1>
        <Link to="/report-item" className={styles.newReportButton}>
          New Report
        </Link>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === "ALL" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("ALL")}
        >
          All Reports
        </button>
        <button
          className={`${styles.filterButton} ${filter === "LOST" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("LOST")}
        >
          Lost Items
        </button>
        <button
          className={`${styles.filterButton} ${filter === "FOUND" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("FOUND")}
        >
          Found Items
        </button>
      </div>

      {filteredReports.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No reports found</p>
          <Link to="/report-item" className={styles.createButton}>
            Create your first report
          </Link>
        </div>
      ) : (
        <div className={styles.reportsList}>
          {filteredReports.map((report) => (
            <div key={report.id} className={styles.reportCard}>
              <div className={styles.reportHeader}>
                <div className={styles.reportType} data-type={report.type}>
                  {report.type}
                </div>
                <div className={styles.reportStatus} data-status={report.status}>
                  {report.status}
                </div>
              </div>

              <div className={styles.reportContent}>
                <h3 className={styles.reportTitle}>{report.items.map((item) => item.name).join(", ")}</h3>

                <div className={styles.reportDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Location:</span>
                    <span>{report.location}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>{report.type === "LOST" ? "Last Seen:" : "Found On:"}</span>
                    <span>
                      {new Date(report.lastSeen).toLocaleDateString()} at{" "}
                      {new Date(report.lastSeen).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Reported:</span>
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className={styles.reportDescription}>
                  <p>{report.description}</p>
                </div>
              </div>

              <div className={styles.reportActions}>
                <Link to={`/reports/${report.id}`} className={styles.viewButton}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


