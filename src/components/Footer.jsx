import React from "react";
import { ArrowUpRight } from "lucide-react";
import logo from "../images/logo.PNG";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* ================================
            TOP
        ================================= */}

        <div className="footer-top">

          <div className="footer-brand-area">

            <img
              src={logo}
              alt="Kitchen Craftz"
              className="footer-logo-img"
            />

            <p className="footer-tagline">
              Thoughtfully designed kitchens,
              <br />
              made around the way you live.
            </p>

          </div>


          <a href="/contact" className="footer-cta">
            Start a conversation
            <ArrowUpRight size={16} />
          </a>

        </div>


        {/* ================================
            NAVIGATION
        ================================= */}

        <div className="footer-middle">

          <div className="footer-column">

            <span className="footer-column-title">
              Explore
            </span>

            <a href="/">Home</a>
            <a href="/kitchens">Kitchens</a>
            <a href="/projects">Projects</a>
            <a href="/materials">Materials</a>

          </div>


          <div className="footer-column">

            <span className="footer-column-title">
              Company
            </span>

            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>

          </div>


          <div className="footer-column">

            <span className="footer-column-title">
              Connect
            </span>

            <a href="tel:+919876543210">
              +91 98765 43210
            </a>

            <a href="mailto:hello@yourbrand.com">
              hello@yourbrand.com
            </a>

            <span className="footer-location">
              Kerala, India
            </span>

            <div className="footer-socials">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>

            </div>

          </div>

        </div>


        {/* ================================
            BOTTOM
        ================================= */}

        <div className="footer-bottom">

          <span>
            © 2026 Kitchen Craftz
          </span>

          <span>
            Made with intention.
          </span>

          <button
            className="footer-top-button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Back to top
            <ArrowUpRight size={14} />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;