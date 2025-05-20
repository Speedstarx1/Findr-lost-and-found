"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllReports } from "../services/reportService"
import styles from "./SearchItems.module.css"

const SearchItems = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "ALL",
    status: "OPEN",
    dateRange: "30",
  })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)

    try {
      const allReports = await getAllReports()

      const filtered = allReports.filter((report) => {
        const matchesSearchTerm = searchTerm === "" ||
          report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.items?.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesType = filters.type === "ALL" || report.type === filters.type
        const matchesStatus = filters.status === "ALL" || report.status === filters.status

        const reportDate = new Date(report.lastSeen)
        const now = new Date()
        const daysDiff = (now - reportDate) / (1000 * 60 * 60 * 24)
        const matchesDate =
          filters.dateRange === "ALL" || daysDiff <= parseInt(filters.dateRange)

        return matchesSearchTerm && matchesType && matchesStatus && matchesDate
      })

      setResults(filtered)
    } catch (err) {
      console.error("Error loading reports:", err)
      setError("Failed to load reports. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [searchTerm, filters])

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className={styles.searchPage}>
      <h1 className={styles.title}>Search Lost & Found Items</h1>

      <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for items..."
            className={styles.searchInput}
          />
          <button type="button" onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>

        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label>Item Type</label>
            <div className={styles.filterOptions}>
              {["ALL", "LOST", "FOUND"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${styles.filterOption} ${filters.type === type ? styles.activeFilter : ""}`}
                  onClick={() => handleFilterChange("type", type)}
                >
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Status</label>
            <div className={styles.filterOptions}>
              {["ALL", "OPEN", "CLOSED"].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`${styles.filterOption} ${filters.status === status ? styles.activeFilter : ""}`}
                  onClick={() => handleFilterChange("status", status)}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Date Range</label>
            <div className={styles.filterOptions}>
              {["7", "30", "ALL"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`${styles.filterOption} ${filters.dateRange === range ? styles.activeFilter : ""}`}
                  onClick={() => handleFilterChange("dateRange", range)}
                >
                  {range === "ALL" ? "All time" : `Last ${range} days`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>

      {loading ? (
        <div className={styles.loading}>Searching...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.resultsContainer}>
          <h2 className={styles.resultsTitle}>
            {results.length} {results.length === 1 ? "Result" : "Results"} Found
          </h2>

          {results.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No items found matching your search criteria</p>
              <p className={styles.emptyStateSubtext}>Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className={styles.resultsList}>
              {results.map((report) => (
                <div key={report.id} className={styles.resultCard}>
                  <div className={styles.resultHeader}>
                    <div className={styles.resultType} data-type={report.type}>
                      {report.type || "Unknown"}
                    </div>
                    <div className={styles.resultStatus} data-status={report.status}>
                      {report.status || "Unknown"}
                    </div>
                  </div>

                  <div className={styles.resultContent}>
                    <h3 className={styles.resultTitle}>
                      {report.items?.map((item) => item.name).join(", ")}
                    </h3>

                    <div className={styles.resultDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Location:</span>
                        <span>{report.location}</span>
                      </div>

                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>{report.type === "LOST" ? "Lost On:" : "Found On:"}</span>
                        <span>{new Date(report.lastSeen).toLocaleDateString()}</span>
                      </div>

                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Reported By:</span>
                        <span>{report.user?.name}</span>
                      </div>
                    </div>

                    <div className={styles.resultDescription}>
                      <p>{report.description?.substring(0, 150)}...</p>
                    </div>
                  </div>

                  <div className={styles.resultActions}>
                    <Link to={`/reports/${report.id}`} className={styles.viewButton}>
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchItems
