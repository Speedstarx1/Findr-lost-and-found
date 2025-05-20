import { Link } from "react-router-dom"
import { MapPin, FileText, AlertTriangle, CheckCircle } from "lucide-react"
import styles from "./Pages.module.css"

export default function TermsPage() {
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
          <h1 className={styles.pageTitle}>Terms of Service</h1>
          <p className={styles.pageSubtitle}>Last updated: May 14, 2025</p>
        </div>

        <section className={styles.contentSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.policyIntro}>
              <div className={styles.policyIconWrapper}>
                <FileText className={styles.policyIcon} />
              </div>
              <p className={styles.policyIntroText}>
                These Terms of Service ("Terms") govern your access to and use of the Findr application and website.
                Please read these Terms carefully before using our services. By accessing or using Findr, you agree to
                be bound by these Terms and our Privacy Policy.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>
                <CheckCircle className={styles.policySectionIcon} />
                Acceptance of Terms
              </h2>
              <p className={styles.policySectionText}>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part
                of the terms, then you may not access the Service.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Eligibility</h2>
              <p className={styles.policySectionText}>
                The Service is intended solely for users who are students or staff at Nigerian universities. By using
                the Service, you represent and warrant that you are a current student or staff member at a Nigerian
                university and that you have the right, authority, and capacity to enter into these Terms and to abide
                by all of the terms and conditions set forth herein.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>User Accounts</h2>
              <p className={styles.policySectionText}>
                When you create an account with us, you must provide accurate, complete, and current information at all
                times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
                your account on our Service.
              </p>
              <p className={styles.policySectionText}>
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password. You agree not to disclose your password to any third party.
                You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your
                account.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>
                <AlertTriangle className={styles.policySectionIcon} />
                Prohibited Uses
              </h2>
              <p className={styles.policySectionText}>You agree not to use the Service:</p>

              <ul className={styles.policyList}>
                <li>In any way that violates any applicable national or international law or regulation.</li>
                <li>To impersonate or attempt to impersonate another user or person.</li>
                <li>
                  To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service.
                </li>
                <li>To report false lost or found items.</li>
                <li>To attempt to claim items that do not belong to you.</li>
                <li>To harass, abuse, or harm another person through the Service.</li>
                <li>To use the Service in any manner that could disable, overburden, damage, or impair the Service.</li>
              </ul>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Lost and Found Items</h2>
              <p className={styles.policySectionText}>
                Findr provides a platform for users to report lost items and register found items. We do not guarantee
                that lost items will be found or returned. We are not responsible for the condition of items, the
                accuracy of item descriptions, or the conduct of users when arranging to return or collect items.
              </p>
              <p className={styles.policySectionText}>
                When reporting a lost item or registering a found item, you agree to provide accurate and detailed
                information. When claiming a lost item, you may be required to provide proof of ownership or other
                identifying information.
              </p>
              <p className={styles.policySectionText}>
                Findr reserves the right to remove any lost or found item listing that violates these Terms or that we
                determine, in our sole discretion, is inappropriate.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Intellectual Property</h2>
              <p className={styles.policySectionText}>
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of Findr and its licensors. The Service is protected by copyright, trademark, and other laws of
                both Nigeria and foreign countries. Our trademarks and trade dress may not be used in connection with
                any product or service without the prior written consent of Findr.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Termination</h2>
              <p className={styles.policySectionText}>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className={styles.policySectionText}>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Limitation of Liability</h2>
              <p className={styles.policySectionText}>
                In no event shall Findr, nor its directors, employees, partners, agents, suppliers, or affiliates, be
                liable for any indirect, incidental, special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
                to or use of or inability to access or use the Service.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Changes to Terms</h2>
              <p className={styles.policySectionText}>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material we will try to provide at least 30 days' notice prior to any new terms taking
                effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className={styles.policySectionText}>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound
                by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.policySectionTitle}>Contact Us</h2>
              <p className={styles.policySectionText}>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className={styles.policyContactInfo}>
                Findr
                <br />
                Email: legal@findrapp.ng
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
