import { Link } from "react-router-dom"
import { MapPin, Users, Award, Calendar } from "lucide-react"
import styles from "./Pages.module.css"

export default function AboutPage() {
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
          <h1 className={styles.pageTitle}>About Findr</h1>
          <p className={styles.pageSubtitle}>Connecting lost items with their owners across Nigerian campuses</p>
        </div>

        <section className={styles.contentSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.aboutIntro}>
              <div className={styles.aboutImageWrapper}>
                <div className={styles.aboutImageBackground}></div>
                <div className={styles.aboutImageInnerCircle}>
                  <MapPin className={styles.aboutIcon} />
                </div>
              </div>
              <div className={styles.aboutIntroText}>
                <h2 className={styles.sectionTitle}>Our Story</h2>
                <p className={styles.sectionText}>
                  Findr was founded in 2025 by a group of students of the university of Lagos inspired by their school Java project who experienced firsthand the frustration
                  of losing valuable items on campus. After noticing how many items went unclaimed in lost and found
                  offices across Nigerian universities, they decided to create a digital solution to connect lost items
                  with their rightful owners.
                </p>
                <p className={styles.sectionText}>
                  What started as a small project at the University of Lagos has now expanded to over 15 universities
                  across Nigeria, helping thousands of students recover their lost belongings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contentSection + " " + styles.altSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle + " " + styles.centeredTitle}>Our Mission</h2>
            <p className={styles.sectionText + " " + styles.centeredText}>
              We're on a mission to create a more connected and helpful campus community by leveraging technology to
              solve everyday problems. We believe that by helping students recover their lost items, we can reduce
              stress and financial burden while promoting honesty and community support.
            </p>

            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIconWrapper}>
                  <Users className={styles.valueIcon} />
                </div>
                <h3 className={styles.valueTitle}>Community</h3>
                <p className={styles.valueText}>
                  Building stronger campus communities through mutual support and assistance.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIconWrapper}>
                  <Award className={styles.valueIcon} />
                </div>
                <h3 className={styles.valueTitle}>Integrity</h3>
                <p className={styles.valueText}>Promoting honesty and trustworthiness in all our interactions.</p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIconWrapper}>
                  <Calendar className={styles.valueIcon} />
                </div>
                <h3 className={styles.valueTitle}>Innovation</h3>
                <p className={styles.valueText}>
                  Using technology to solve everyday problems in simple, effective ways.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          {/* <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle + " " + styles.centeredTitle}>Our Team</h2>
            <p className={styles.sectionText + " " + styles.centeredText}>
              Findr is powered by a dedicated team of Nigerian students and recent graduates who are passionate about
              using technology to improve campus life.
            </p>

            <div className={styles.teamGrid}>
              <div className={styles.teamMember}>
                <div className={styles.teamMemberImage}>
                  <img src="/placeholder.svg?height=200&width=200" alt="Oluwaseun Adeyemi" />
                </div>
                <h3 className={styles.teamMemberName}>Oluwaseun Adeyemi</h3>
                <p className={styles.teamMemberRole}>Co-Founder & CEO</p>
                <p className={styles.teamMemberBio}>
                  Computer Science graduate from University of Lagos with a passion for solving real-world problems.
                </p>
              </div>

              <div className={styles.teamMember}>
                <div className={styles.teamMemberImage}>
                  <img src="/placeholder.svg?height=200&width=200" alt="Chioma Okonkwo" />
                </div>
                <h3 className={styles.teamMemberName}>Chioma Okonkwo</h3>
                <p className={styles.teamMemberRole}>Co-Founder & CTO</p>
                <p className={styles.teamMemberBio}>
                  Software Engineering graduate from Obafemi Awolowo University with expertise in mobile development.
                </p>
              </div>

              <div className={styles.teamMember}>
                <div className={styles.teamMemberImage}>
                  <img src="/placeholder.svg?height=200&width=200" alt="Ibrahim Yusuf" />
                </div>
                <h3 className={styles.teamMemberName}>Ibrahim Yusuf</h3>
                <p className={styles.teamMemberRole}>Head of Operations</p>
                <p className={styles.teamMemberBio}>
                  Business Administration graduate from Ahmadu Bello University with a focus on scaling startups.
                </p>
              </div>
            </div>
          </div> */}
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaHeading}>Join the Findr Community</h2>
            <p className={styles.ctaText}>Be part of our mission to create a more connected campus experience.</p>
            <div className={styles.ctaButtons}>
              <Link to="/register">
                <button className={styles.ctaButton}>Get Started Today</button>
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
