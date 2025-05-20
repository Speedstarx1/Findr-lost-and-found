// Home.jsx
import { Link } from "react-router-dom"
import { ArrowRight, Search, MapPin } from "lucide-react"
import styles from "./Home.module.css"

export default function Home() {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoSection}>
            <MapPin className={styles.mapPinIcon} />
           

            <span className={styles.logoText}>Findr</span>
           
          </div>
          <div className={styles.authLinks}>
            <Link to="/sign-in">
              <button className={styles.signInBtn}>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button className={styles.signUpBtn}>Sign Up</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1 className={styles.heroHeading}>
              Reunite with your <span className={styles.highlight}>lost items</span>
            </h1>
            <p className={styles.heroSubtext}>
              Findr connects people who have lost items with those who have found them. Our platform makes it easy to
              report, search, and reclaim lost possessions.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/sign-up">
                <button className={styles.getStartedBtn}>
                  Get Started <ArrowRight className={styles.arrowIcon} />
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageBackground}></div>
            <div className={styles.heroImageInnerCircle}>
              <Search className={styles.searchIconHero} />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <h2 className={styles.featuresHeading}>How Findr Works</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Search className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Report Lost Items</h3>
              <p className={styles.featureText}>
                Quickly report your lost items with detailed descriptions to help finders identify them.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <MapPin className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Register Found Items</h3>
              <p className={styles.featureText}>
                Found something? Register it on Findr to help connect it with its rightful owner.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <ArrowRight className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Connect & Recover</h3>
              <p className={styles.featureText}>
                Our system matches lost and found items, helping you recover your belongings safely.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>
            <MapPin className={styles.footerIcon} />
            <span className={styles.footerLogoText}>Findr</span>
          </div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Findr. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
