import { Link } from "react-router-dom"
import { MapPin, Mail, Phone, MessageSquare, Send } from "lucide-react"
import styles from "./Pages.module.css"

export default function ContactPage() {
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
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.pageSubtitle}>We're here to help with any questions or feedback</p>
        </div>

        <section className={styles.contentSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                <h2 className={styles.sectionTitle}>Get in Touch</h2>
                <p className={styles.sectionText}>
                  Have questions about Findr? Want to partner with us? Or just want to say hello? Reach out to us using
                  any of the methods below or fill out the contact form.
                </p>

                <div className={styles.contactMethods}>
                  <div className={styles.contactMethod}>
                    <div className={styles.contactMethodIcon}>
                      <Mail className={styles.contactIcon} />
                    </div>
                    <div className={styles.contactMethodDetails}>
                      <h3 className={styles.contactMethodTitle}>Email</h3>
                      <p className={styles.contactMethodText}>hellofindrapp@gmail.com</p>
                      <p className={styles.contactMethodText}>supportfindrapp@gmail.com</p>
                    </div>
                  </div>

                  <div className={styles.contactMethod}>
                    <div className={styles.contactMethodIcon}>
                      <Phone className={styles.contactIcon} />
                    </div>
                    <div className={styles.contactMethodDetails}>
                      <h3 className={styles.contactMethodTitle}>Phone</h3>
                      <p className={styles.contactMethodText}>+234 916 248 5635</p>
                      <p className={styles.contactMethodText}>Mon-Fri, 9am-5pm WAT</p>
                    </div>
                  </div>

                  <div className={styles.contactMethod}>
                    <div className={styles.contactMethodIcon}>
                      <MessageSquare className={styles.contactIcon} />
                    </div>
                    <div className={styles.contactMethodDetails}>
                      <h3 className={styles.contactMethodTitle}>Social Media</h3>
                      <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialLink}>
                          Twitter
                        </a>
                        <a href="#" className={styles.socialLink}>
                          Instagram
                        </a>
                        <a href="#" className={styles.socialLink}>
                          Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.contactForm}>
                <h2 className={styles.formTitle}>Send Us a Message</h2>
                <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Full Name
                    </label>
                    <input type="text" id="name" className={styles.formInput} placeholder="Your full name" required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={styles.formInput}
                      placeholder="Your email address"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className={styles.formInput}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      className={styles.formTextarea}
                      placeholder="Your message"
                      rows={5}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Send Message
                    <Send className={styles.submitIcon} size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contentSection + " " + styles.altSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle + " " + styles.centeredTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How does Findr work?</h3>
                <p className={styles.faqAnswer}>
                  Findr connects people who have lost items with those who have found them. Users can report lost items
                  or register found items, and our system helps match them based on descriptions, locations, and timing.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Is Findr available at my university?</h3>
                <p className={styles.faqAnswer}>
                  Findr is currently available at 15+ universities across Nigeria. Check our{" "}
                  <Link to="/campus-list" className={styles.inlineLink}>
                    campus list
                  </Link>{" "}
                  to see if your university is included. If not, let us know and we'll consider expanding to your
                  campus!
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How much does it cost to use Findr?</h3>
                <p className={styles.faqAnswer}>
                  Findr is completely free for all university students. We believe in making campus life easier without
                  adding financial burden.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How can I partner with Findr?</h3>
                <p className={styles.faqAnswer}>
                  We're always open to partnerships with student organizations, university administrations, and
                  businesses. Contact us at partnerships@findrapp.ng to discuss collaboration opportunities.
                </p>
              </div>
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
