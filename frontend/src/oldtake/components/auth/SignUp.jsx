// components/SignUp.jsx
import { Link } from "react-router-dom"
import RegisterForm from "./Register"
import { MapPin, Search, ArrowRight } from "lucide-react"
import styles from "./SignUp.module.css"

export default function SignUp() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <MapPin className={styles.logoIcon} />
            <span className={styles.logoText}>Findr</span>
          </div>
          <h1 className={styles.heading}>Join the Findr Community</h1>
          <p className={styles.subText}>
            Create an account to start reporting lost items or help others find their belongings.
          </p>

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <Search className={styles.icon} />
              <div>
                <h3 className={styles.featureTitle}>Find Lost Items</h3>
                <p className={styles.featureText}>
                  Search our database of found items to locate your lost belongings.
                </p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <MapPin className={styles.icon} />
              <div>
                <h3 className={styles.featureTitle}>Report Found Items</h3>
                <p className={styles.featureText}>
                  Help others by registering items you've found on campus.
                </p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <ArrowRight className={styles.icon} />
              <div>
                <h3 className={styles.featureTitle}>Connect & Recover</h3>
                <p className={styles.featureText}>
                  Our system matches lost and found items automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <RegisterForm/>
          <p className={styles.signInPrompt}>
            Already have an account?{" "}
            <Link to="/sign-in" className={styles.signInLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Findr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
