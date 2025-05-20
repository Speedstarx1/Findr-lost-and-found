"use client"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import { createReport } from "../services/reportService"
import styles from "./ReportItem.module.css"

const ReportItem = () => {
   const { user, loading: authLoading ,token} = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialType = queryParams.get("type") === "found" ? "FOUND" : "LOST"

  const [formData, setFormData] = useState({
    type: initialType,
    items: [{ name: "" }],
    description: "",
    location: "",
    lastSeen: "",
    imageUrls: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleItemChange = (index, value) => {
    const updatedItems = [...formData.items]
    updatedItems[index].name = value
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }))
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "" }],
    }))
  }

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const updatedItems = [...formData.items]
      updatedItems.splice(index, 1)
      setFormData((prev) => ({
        ...prev,
        items: updatedItems,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Format the data for the API
      const reportData = {
        ...formData,
        lastSeen: new Date(formData.lastSeen).toISOString(),
      }

      const response = await createReport(reportData,token)
      console.log("Report created:", response)
      // navigate(`/reports/${response.id}`)
    } catch (err) {
      console.error("Error creating report:", err)
      setError("Failed to create report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.reportItemPage}>
      <h1 className={styles.title}>{formData.type === "LOST" ? "Report Lost Item" : "Report Found Item"}</h1>

      <div className={styles.typeSelector}>
        <button
          className={`${styles.typeButton} ${formData.type === "LOST" ? styles.activeType : ""}`}
          onClick={() => setFormData((prev) => ({ ...prev, type: "LOST" }))}
        >
          I Lost an Item
        </button>
        <button
          className={`${styles.typeButton} ${formData.type === "FOUND" ? styles.activeType : ""}`}
          onClick={() => setFormData((prev) => ({ ...prev, type: "FOUND" }))}
        >
          I Found an Item
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h2>Item Details</h2>

          <div className={styles.itemsList}>
            {formData.items.map((item, index) => (
              <div key={index} className={styles.itemRow}>
                <div className={styles.formGroup}>
                  <label htmlFor={`item-${index}`}>Item Name</label>
                  <input
                    type="text"
                    id={`item-${index}`}
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeItem(index)}
                  disabled={formData.items.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={addItem}>
              + Add Another Item
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the item(s)..."
            required
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where was the item lost/found?"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastSeen">
            {formData.type === "LOST" ? "When did you last see it?" : "When did you find it?"}
          </label>
          <input
            type="datetime-local"
            id="lastSeen"
            name="lastSeen"
            value={formData.lastSeen}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrls">Image URLs (Optional)</label>
          <input
            type="text"
            id="imageUrls"
            name="imageUrls"
            value={formData.imageUrls}
            onChange={handleChange}
            placeholder="Add URLs to images, separated by commas"
          />
          <p className={styles.hint}>You can upload images to a service like Imgur and paste the links here</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportItem
