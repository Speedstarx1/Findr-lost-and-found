"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/dashboard">
          <h1>Findr</h1>
        </Link>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search for items..." />
        <button>Search</button>
      </div>
      <div className={styles.profile}>
        {user && (
          <>
            <span className={styles.username}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
