import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Clock3,
} from "lucide-react";
import "./ContactPage.css";

import contactHero from "../../images/classic.jpg";
import contactDetail1 from "../../images/luxury.jpg";
// import contactDetail2 from "../../images/wood2.jpg";
// import contactDetail3 from "../../images/wood2.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Modular Kitchen",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect this to your backend/API
    console.log(formData);
  };

  return (
    <main className="contact-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-image">
          <img
            src={contactHero}
            alt="Premium kitchen interior"
          />
        </div>

        <div className="contact-hero-overlay" />

        <div className="contact-hero-content">

          <div className="contact-hero-top">
            <span>CONTACT STUDIO</span>

            <div className="contact-breadcrumb">
              HOME
              <ChevronRight size={11} />
              CONTACT
            </div>
          </div>

          <div className="contact-hero-copy">

            <span className="contact-hero-small">
              A SPACE WORTH TALKING ABOUT
            </span>

            <div className="contact-hero-title">
              Let's create
              <br />
              <em>your next space.</em>
            </div>

          </div>

          <div className="contact-hero-bottom">

            <span>
              INTERIOR DESIGN · MODULAR KITCHENS · BESPOKE SPACES
            </span>

            <div className="contact-hero-line" />

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO / ADDRESS
      ===================================================== */}

      <section className="contact-intro">

        <div className="contact-intro-decoration contact-intro-decoration-left" />
        <div className="contact-intro-decoration contact-intro-decoration-right" />

        <div className="contact-intro-content">

          <span className="contact-kicker">
            OUR STUDIO
          </span>

          <div className="contact-address">
            <em>Creating</em>

            <strong>
              Calicut, Kerala
            </strong>

            <span>
              Designing kitchens and interiors
              <br />
              made for the way you live.
            </span>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Calicut%2C%20Kerala"
            target="_blank"
            rel="noreferrer"
            className="contact-map-link"
          >
            <span>FIND US ON MAP</span>
            <ArrowUpRight size={14} />
          </a>

        </div>

      </section>


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <section className="contact-info">

        <a
          href="tel:+919876543210"
          className="contact-info-card"
        >
          <div className="contact-info-icon">
            <Phone size={17} />
          </div>

          <div className="contact-info-content">
            <span>MAKE A CALL</span>

            <p>
              Speak with our design team
              <br />
              about your project.
            </p>

            <strong>
              +91 98765 43210
            </strong>
          </div>

          <ArrowUpRight
            size={15}
            className="contact-info-arrow"
          />
        </a>


        <a
          href="mailto:hello@yourstudio.com"
          className="contact-info-card"
        >
          <div className="contact-info-icon">
            <Mail size={17} />
          </div>

          <div className="contact-info-content">
            <span>SEND A MAIL</span>

            <p>
              Send your ideas and
              <br />
              project details.
            </p>

            <strong>
              hello@yourstudio.com
            </strong>
          </div>

          <ArrowUpRight
            size={15}
            className="contact-info-arrow"
          />
        </a>


        <div className="contact-info-card">

          <div className="contact-info-icon">
            <Clock3 size={17} />
          </div>

          <div className="contact-info-content">
            <span>STUDIO HOURS</span>

            <p>
              Monday — Saturday
              <br />
              9:30 AM — 6:30 PM
            </p>

            <strong>
              BY APPOINTMENT
            </strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          FORM + IMAGE
      ===================================================== */}

      <section className="contact-enquiry">

        <div className="contact-enquiry-image">

          <img
            src={contactDetail1}
            alt="Modern kitchen interior"
          />

          <div className="contact-enquiry-image-overlay" />

          <div className="contact-enquiry-image-copy">

            <span>
              DESIGNED AROUND YOU
            </span>

            <div>
              Refined
              <br />
              <em>by detail.</em>
            </div>

            <div className="contact-image-line" />

          </div>

        </div>


        <div className="contact-form-panel">
          <div className="contact-form-glass-reflection" />
          <div className="contact-form-heading">
            <span className="contact-kicker">
              PROJECT ENQUIRY
            </span>
            <div className="contact-form-title">
              Tell us about
              <br />
              <em>your project.</em>
            </div>

            <p>
              Share a few details with us and our team
              will get back to you shortly.
            </p>

          </div>


          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="contact-form-row">

              <div className="contact-field">
                <label>YOUR NAME</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-field">
                <label>PHONE NUMBER</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            <div className="contact-form-row">

              <div className="contact-field">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-field">
                <label>PROJECT TYPE</label>

                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                >
                  <option>Modular Kitchen</option>
                  <option>Full Home Interior</option>
                  <option>Kitchen Renovation</option>
                  <option>Wardrobe & Storage</option>
                  <option>Commercial Interior</option>
                  <option>Other</option>
                </select>
              </div>

            </div>


            <div className="contact-field contact-message-field">

              <label>YOUR MESSAGE</label>

              <textarea
                name="message"
                placeholder="Tell us about your space, location and ideas..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />

            </div>


            <div className="contact-form-footer">

              <span>
                We usually respond within one working day.
              </span>

              <button
                type="submit"
                className="contact-submit"
              >
                <span>SEND ENQUIRY</span>

                <div>
                  <ArrowRight size={16} />
                </div>
              </button>

            </div>

          </form>

        </div>

      </section>


      {/* =====================================================
          WHATSAPP
      ===================================================== */}

      {/* <section className="contact-whatsapp">

        <div className="contact-whatsapp-orb" />

        <div className="contact-whatsapp-content">

          <div className="contact-whatsapp-symbol">
            <MessageCircle size={20} />
          </div>

          <div className="contact-whatsapp-text">

            <span>
              A QUICKER WAY TO CONNECT
            </span>

            <div>
              Have a question?
              <em> Let's chat.</em>
            </div>

          </div>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="contact-whatsapp-button"
          >
            <span>CHAT ON WHATSAPP</span>
            <ArrowUpRight size={15} />
          </a>

        </div>

      </section> */}


      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="contact-location">

        <div className="contact-location-heading">

          <div>

            <span className="contact-kicker">
              VISIT OUR STUDIO
            </span>
{/* 
            <div className="contact-location-title">
              Come see
              <br />
              <em>the difference.</em>
            </div> */}

          </div>

          <p>
            Visit us to explore finishes, materials and
            kitchen details in person.
          </p>

        </div>


        <div className="contact-map">

          <iframe
            title="Our Studio Location"
            src="https://www.google.com/maps?q=Calicut%2C%20Kerala&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="contact-map-card">

            <div className="contact-map-icon">
              <MapPin size={17} />
            </div>

            <div className="contact-map-copy">

              <span>OUR STUDIO</span>

              <strong>
                Calicut, Kerala
              </strong>

              <small>
                Kerala, India
              </small>

            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Calicut%2C%20Kerala"
              target="_blank"
              rel="noreferrer"
              aria-label="Open location"
            >
              <Navigation size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;