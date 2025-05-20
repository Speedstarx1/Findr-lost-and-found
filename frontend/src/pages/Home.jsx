import { Link } from "react-router-dom"
import { ArrowRight, Search, MapPin, Smartphone, Backpack } from "lucide-react"
import styles from "./Home.module.css"

export default function HomePage() {
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
            <Link to="/login">
              <button className={styles.signInBtn}>Sign In</button>
            </Link>
            <Link to="/register">
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
              Reunite with your <span className={styles.highlight}>lost items</span> on campus
            </h1>
            <p className={styles.heroSubtext}>
              Findr connects Nigerian university students who have lost items with those who have found them. From
              textbooks to laptops, we help you recover what matters.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/register">
                <button className={styles.getStartedBtn}>
                  Get Started <ArrowRight className={styles.arrowIcon} />
                </button>
              </Link>
              <Link to="/how-it-works">
                <button className={styles.learnMoreBtn}>Learn More</button>
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

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Nigerian Universities</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5,000+</span>
            <span className={styles.statLabel}>Items Recovered</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10,000+</span>
            <span className={styles.statLabel}>Happy Students</span>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <h2 className={styles.featuresHeading}>How Findr Works</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Backpack className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Report Lost Items</h3>
              <p className={styles.featureText}>
                Quickly report your lost items with detailed descriptions. Common campus items like ID cards, textbooks,
                and electronics are easily categorized.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <MapPin className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Register Found Items</h3>
              <p className={styles.featureText}>
                Found something in the lecture hall or campus grounds? Register it on Findr to help connect it with its
                rightful owner.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Smartphone className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Connect & Recover</h3>
              <p className={styles.featureText}>
                Our system matches lost and found items, helping you recover your belongings safely through our secure
                campus meetup system.
              </p>
            </div>
          </div>
        </div>

        {/* Campus Section */}
        <div className={styles.campusSection}>
          <div className={styles.campusContent}>
            <h2 className={styles.campusHeading}>Available at Top Nigerian Universities</h2>
            <p className={styles.campusText}>
              Findr is currently available at leading universities across Nigeria, helping thousands of students recover
              their lost items every semester.
            </p>
            <div className={styles.campusList}>
              <div className={styles.campusItem}>University of Lagos</div>
              <div className={styles.campusItem}>University of Ibadan</div>
              <div className={styles.campusItem}>Obafemi Awolowo University</div>
              <div className={styles.campusItem}>University of Nigeria</div>
              <div className={styles.campusItem}>Ahmadu Bello University</div>
              <div className={styles.campusItem}>University of Benin</div>
              <div className={styles.campusItem}>+ 9 more campuses</div>
            </div>
            <Link to="/campus-list">
              <button className={styles.campusBtn}>
                See All Campuses <ArrowRight className={styles.arrowIcon} />
              </button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaHeading}>Ready to find what you've lost?</h2>
            <p className={styles.ctaText}>
              Join thousands of Nigerian university students who have successfully recovered their lost items.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/register">
                <button className={styles.ctaSignUpBtn}>
                  Sign Up Now <ArrowRight className={styles.arrowIcon} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>
              <MapPin className={styles.footerIcon} />
              <span className={styles.footerLogoText}>Findr</span>
            </div>
            <div className={styles.footerLinks}>
              <Link to="/about" className={styles.footerLink}>
                About
              </Link>
              <Link to="/contact" className={styles.footerLink}>
                Contact
              </Link>
              <Link to="/privacy" className={styles.footerLink}>
                Privacy
              </Link>
              <Link to="/terms" className={styles.footerLink}>
                Terms
              </Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.footerCopyright}>© {new Date().getFullYear()} Findr. All rights reserved.</div>
            <div className={styles.footerTagline}>Made with ❤️ for Nigerian students</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
