import { Link } from "react-router-dom"
import { MapPin, Search, MapPinned, School } from "lucide-react"
import styles from "./Pages.module.css"

export default function CampusListPage() {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logoSection}>
            <MapPin className={styles.mapPinIcon} />
            <span className={styles.logoText}>Findr</span>
          </Link>
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

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Campus Locations</h1>
          <p className={styles.pageSubtitle}>Findr is available at these Nigerian universities</p>
        </div>

        <section className={styles.contentSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.campusSearchContainer}>
              <div className={styles.campusSearch}>
                <Search className={styles.campusSearchIcon} />
                <input type="text" className={styles.campusSearchInput} placeholder="Search for your university..." />
              </div>
            </div>

            <div className={styles.campusRegions}>
              <div className={styles.campusRegion}>
                <h2 className={styles.regionTitle}>
                  <MapPinned className={styles.regionIcon} />
                  South West
                </h2>
                <div className={styles.campusList}>
                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>University of Lagos</h3>
                      <p className={styles.campusLocation}>Lagos, Nigeria</p>
                      <p className={styles.campusStats}>1,200+ users • 500+ items recovered</p>
                    </div>
                  </div>

                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>University of Ibadan</h3>
                      <p className={styles.campusLocation}>Ibadan, Nigeria</p>
                      <p className={styles.campusStats}>950+ users • 420+ items recovered</p>
                    </div>
                  </div>

                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>Obafemi Awolowo University</h3>
                      <p className={styles.campusLocation}>Ile-Ife, Nigeria</p>
                      <p className={styles.campusStats}>850+ users • 380+ items recovered</p>
                    </div>
                  </div>

                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>Federal University of Technology, Akure</h3>
                      <p className={styles.campusLocation}>Akure, Nigeria</p>
                      <p className={styles.campusStats}>720+ users • 310+ items recovered</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.campusRegion}>
                <h2 className={styles.regionTitle}>
                  <MapPinned className={styles.regionIcon} />
                  South East
                </h2>
                <div className={styles.campusList}>
                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>University of Nigeria</h3>
                      <p className={styles.campusLocation}>Nsukka, Nigeria</p>
                      <p className={styles.campusStats}>880+ users • 390+ items recovered</p>
                    </div>
                  </div>

                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>Nnamdi Azikiwe University</h3>
                      <p className={styles.campusLocation}>Awka, Nigeria</p>
                      <p className={styles.campusStats}>650+ users • 280+ items recovered</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.campusRegion}>
                <h2 className={styles.regionTitle}>
                  <MapPinned className={styles.regionIcon} />
                  North Central
                </h2>
                <div className={styles.campusList}>
                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>University of Ilorin</h3>
                      <p className={styles.campusLocation}>Ilorin, Nigeria</p>
                      <p className={styles.campusStats}>820+ users • 360+ items recovered</p>
                    </div>
                  </div>

                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>Federal University of Technology, Minna</h3>
                      <p className={styles.campusLocation}>Minna, Nigeria</p>
                      <p className={styles.campusStats}>580+ users • 250+ items recovered</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.campusRegion}>
                <h2 className={styles.regionTitle}>
                  <MapPinned className={styles.regionIcon} />
                  North West
                </h2>
                <div className={styles.campusList}>
                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>Ahmadu Bello University</h3>
                      <p className={styles.campusLocation}>Zaria, Nigeria</p>
                      <p className={styles.campusStats}>910+ users • 400+ items recovered</p>
                    </div>
                  </div>

                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>Bayero University</h3>
                      <p className={styles.campusLocation}>Kano, Nigeria</p>
                      <p className={styles.campusStats}>680+ users • 290+ items recovered</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.campusRegion}>
                <h2 className={styles.regionTitle}>
                  <MapPinned className={styles.regionIcon} />
                  South South
                </h2>
                <div className={styles.campusList}>
                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>University of Benin</h3>
                      <p className={styles.campusLocation}>Benin City, Nigeria</p>
                      <p className={styles.campusStats}>780+ users • 340+ items recovered</p>
                    </div>
                  </div>

                  <div className={styles.campusCard}>
                    <div className={styles.campusLogo}>
                      <School className={styles.campusIcon} />
                    </div>
                    <div className={styles.campusInfo}>
                      <h3 className={styles.campusName}>University of Port Harcourt</h3>
                      <p className={styles.campusLocation}>Port Harcourt, Nigeria</p>
                      <p className={styles.campusStats}>750+ users • 320+ items recovered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contentSection + " " + styles.altSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.campusExpansion}>
              <h2 className={styles.expansionTitle}>Don't see your university?</h2>
              <p className={styles.expansionText}>
                We're constantly expanding to more campuses across Nigeria. Let us know if you'd like Findr at your
                university!
              </p>
              <Link to="/contact">
                <button className={styles.expansionButton}>Request Your Campus</button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <Link to="/" className={styles.footerLogo}>
              <MapPin className={styles.footerIcon} />
              <span className={styles.footerLogoText}>Findr</span>
            </Link>
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
