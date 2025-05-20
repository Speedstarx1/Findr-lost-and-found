import { Link } from "react-router-dom"
import SignInForm from "./SignInForm"
import { MapPin } from "lucide-react"
import styles from "./signin.module.css"

export default function SignInPage() {
  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.logo}>
            <MapPin className={styles.logoIcon} />
            <span className={styles.logoText}>Findr</span>
          </div>
          <h1 className={styles.heading}>
            Welcome back to Findr
          </h1>
          <p className={styles.subText}>
            Sign in to reconnect with your lost items or help others find theirs.
          </p>
          <div className={styles.tipBox}>
            <div className={styles.tipContent}>
              <h3 className={styles.tipTitle}>Did you know?</h3>
              <p className={styles.tipText}>
                Over 80% of items reported on Findr are successfully returned to their owners within a week!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <SignInForm />
          <p className={styles.signUpText}>
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className={styles.signUpLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>© {new Date().getFullYear()} Findr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
