import React from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">

      <div className="footer-orb footer-orb-one" />
      <div className="footer-orb footer-orb-two" />

      <div className="footer-container">

        {/* MAIN GLASS AREA */}

        <div className="footer-main">

          <div className="footer-intro">

            <div className="footer-brand">
              <span className="footer-brand-mark">✦</span>
              <span>Kitchen Craft</span>
            </div>

            <h2>
              Let's create
              <br />
              something <em>beautiful.</em>
            </h2>

            <p>
              Thoughtfully designed spaces, made around
              the way you live.
            </p>

            <a href="/contact" className="footer-start">
              Start a conversation
              <ArrowUpRight size={18} />
            </a>

          </div>


          {/* LINKS */}

          <div className="footer-navigation">

            <div className="footer-column">
              <h3>Explore</h3>

              <a href="/">Home</a>
              <a href="/kitchens">Kitchens</a>
              <a href="/projects">Our Projects</a>
              <a href="/materials">Materials</a>
            </div>


            <div className="footer-column">
              <h3>Company</h3>

              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms</a>
            </div>


            <div className="footer-column footer-contact">
              <h3>Get in touch</h3>

              <a href="tel:+919876543210">
                <Phone size={16} />
                +91 98765 43210
              </a>

              <a href="mailto:hello@yourbrand.com">
                <Mail size={16} />
                hello@yourbrand.com
              </a>

              <div className="footer-location">
                <MapPin size={16} />
                <span>
                  Kerala, India
                </span>
              </div>

              <div className="footer-socials">

                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                >
                    IG
                </a>

                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                >
                    FB
                </a>

                </div>
            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="footer-bottom">

          <span>
            © 2026 Kitchen Craftz
          </span>

          <span>
            Made with intention
          </span>

          <button
            className="footer-top-button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }
          >
            Back to top
            <ArrowUpRight size={15} />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;