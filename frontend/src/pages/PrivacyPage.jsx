import { Link } from "react-router-dom"
import { MapPin, Shield, Lock, Eye } from "lucide-react"
import styles from "./Pages.module.css"

export default function PrivacyPage() {
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
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <p className={styles.pageSubtitle}>Last updated: May 14, 2025</p>
        </div>

        <section className={styles.contentSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.policyIntro}>
              <div className={styles.policyIconWrapper}>
                <Shield className={styles.policyIcon} />
              </div>
              <p className={styles.policyIntroText}>
                At Findr, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our mobile application and website. Please read this privacy
                policy carefully. If you do not agree with the terms of this privacy policy, please do not access the
                application.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>
                <Lock className={styles.policySectionIcon} />
                Collection of Your Information
              </h2>
              <p className={styles.policySectionText}>
                We may collect information about you in a variety of ways. The information we may collect via the
                Application includes:
              </p>

              <h3 className={styles.policySubsectionTitle}>Personal Data</h3>
              <p className={styles.policySectionText}>
                Personally identifiable information, such as your name, email address, telephone number, and university
                affiliation, that you voluntarily give to us when you register with the Application or when you choose
                to participate in various activities related to the Application. You are under no obligation to provide
                us with personal information of any kind, however your refusal to do so may prevent you from using
                certain features of the Application.
              </p>

              <h3 className={styles.policySubsectionTitle}>Derivative Data</h3>
              <p className={styles.policySectionText}>
                Information our servers automatically collect when you access the Application, such as your native
                actions that are integral to the Application, as well as other interactions with the Application and
                other users via server log files.
              </p>

              <h3 className={styles.policySubsectionTitle}>Geo-Location Information</h3>
              <p className={styles.policySectionText}>
                We may request access or permission to and track location-based information from your mobile device,
                either continuously or while you are using the Application, to provide location-based services. If you
                wish to change our access or permissions, you may do so in your device's settings.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>
                <Eye className={styles.policySectionIcon} />
                Use of Your Information
              </h2>
              <p className={styles.policySectionText}>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized
                experience. Specifically, we may use information collected about you via the Application to:
              </p>

              <ul className={styles.policyList}>
                <li>Create and manage your account.</li>
                <li>Facilitate lost and found item matching.</li>
                <li>Email you regarding your account or activity.</li>
                <li>Send you email marketing communications.</li>
                <li>Enable user-to-user communications.</li>
                <li>Request feedback and contact you about your use of the Application.</li>
                <li>Resolve disputes and troubleshoot problems.</li>
                <li>Respond to product and customer service requests.</li>
                <li>Solicit support for the Application.</li>
              </ul>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Disclosure of Your Information</h2>
              <p className={styles.policySectionText}>
                We may share information we have collected about you in certain situations. Your information may be
                disclosed as follows:
              </p>

              <h3 className={styles.policySubsectionTitle}>By Law or to Protect Rights</h3>
              <p className={styles.policySectionText}>
                If we believe the release of information about you is necessary to respond to legal process, to
                investigate or remedy potential violations of our policies, or to protect the rights, property, and
                safety of others, we may share your information as permitted or required by any applicable law, rule, or
                regulation.
              </p>

              <h3 className={styles.policySubsectionTitle}>Third-Party Service Providers</h3>
              <p className={styles.policySectionText}>
                We may share your information with third parties that perform services for us or on our behalf,
                including payment processing, data analysis, email delivery, hosting services, customer service, and
                marketing assistance.
              </p>

              <h3 className={styles.policySubsectionTitle}>Marketing Communications</h3>
              <p className={styles.policySectionText}>
                With your consent, or with an opportunity for you to withdraw consent, we may share your information
                with third parties for marketing purposes, as permitted by law.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Security of Your Information</h2>
              <p className={styles.policySectionText}>
                We use administrative, technical, and physical security measures to help protect your personal
                information. While we have taken reasonable steps to secure the personal information you provide to us,
                please be aware that despite our efforts, no security measures are perfect or impenetrable, and no
                method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Contact Us</h2>
              <p className={styles.policySectionText}>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className={styles.policyContactInfo}>
                Findr
                <br />
                Email: privacy@findrapp.ng
                <br />
                Phone: +234 801 234 5678
              </p>
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
