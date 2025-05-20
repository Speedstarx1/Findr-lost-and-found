import { NavLink } from "react-router-dom"
import styles from "./Sidebar.module.css"

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/report-item" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              Report Item
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-reports" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              My Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              Search Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-requests" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              My Requests
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
