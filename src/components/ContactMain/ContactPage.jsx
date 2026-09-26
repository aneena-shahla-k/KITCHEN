import React, { useState } from "react";

import {
  ArrowRight,
  MessageCircle,
  User,
  Mail,
  Building2,
  MessageSquare,
  MapPin,
  Clock3,
  Ruler,
  ShieldCheck,
  Factory,
  Home,
  Layers3,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

import "./ContactPage.css";

import contactHero from "../../images/contact/contact-heroo.png";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    requirement: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Contact form submitted:", formData);
  };

  return (
    <main className="contact-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <div className="contact-eyebrow">
            <span></span>
            <span>CONTACT US</span>
            <span></span>
          </div>

          <h2>
            Let’s Build
            <br />
            <em>Your Dream Kitchen.</em>
          </h2>

          <p>
            Have an idea, a question, or need expert
            guidance? We’re here to help you create a
            kitchen that fits your space, style and
            lifestyle.
          </p>

          <div className="contact-hero-features">

            <div className="contact-hero-feature">

              <span className="contact-feature-icon">
                <Ruler size={18} />
              </span>

              <span>
                Precision 3D
                <br />
                Designs
              </span>

            </div>

            <div className="contact-hero-feature">

              <span className="contact-feature-icon">
                <ShieldCheck size={18} />
              </span>

              <span>
                10-Year
                <br />
                Warranty
              </span>

            </div>

            <div className="contact-hero-feature">

              <span className="contact-feature-icon">
                <Factory size={18} />
              </span>

              <span>
                Direct
                <br />
                Manufacturing
              </span>

            </div>

          </div>

        </div>


        <div className="contact-hero-visual">

          <img
            src={contactHero}
            alt="Modern modular kitchen"
          />

        </div>

      </section>


      {/* =====================================================
          CONTACT FORM + STORY PANEL
      ===================================================== */}

      <section
        className="contact-conversation-section"
        id="contact-form"
      >

        <div className="contact-form-card">

          <div className="section-number">
            <span>01</span>
            <i></i>
          </div>

          <h2>
            Start a Conversation
          </h2>

          <p className="form-intro">
            Tell us about your project, and we’ll get
            back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <label className="contact-input">

                <User size={16} />

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </label>

              <label className="contact-input">

                <Mail size={16} />

                <input
                  type="email"
                  name="email"
                  placeholder="Work Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </label>

            </div>


            <label className="contact-input">

              <Building2 size={16} />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />

            </label>


            <label className="contact-input">

              <Layers3 size={16} />

              <select
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
              >
                <option value="">
                  What are you looking for? *
                </option>

                <option value="new-kitchen">
                  New Kitchen
                </option>

                <option value="kitchen-remodel">
                  Kitchen Remodel
                </option>

                <option value="countertop">
                  Countertop & Hardware
                </option>

                <option value="consultation">
                  Design Consultation
                </option>

              </select>

              <ArrowRight size={14} />

            </label>


            <label className="contact-input contact-textarea">

              <MessageSquare size={16} />

              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />

            </label>


            <div className="form-submit-row">

              <button
                type="submit"
                className="contact-submit"
              >
                <MessageCircle size={16} />

                <span>
                  Send Message
                </span>

                <ArrowRight size={15} />

              </button>

              <span className="form-response">

                <Clock3 size={14} />

                We’ll get back to you shortly

              </span>

            </div>

          </form>

        </div>


        {/* STORY PANEL */}

        <div className="contact-story-card">

          <div className="story-card-image">

            <img
              src={contactHero}
              alt="Kitchen craftsmanship"
            />

          </div>

          <div className="story-card-overlay"></div>

          <div className="story-card-content">

            <span className="story-small-line"></span>

            <h3>
              Your Space.
              <br />
              <em>Our Craft.</em>
            </h3>

            <p>
              From concept to completion, we design
              and build kitchens that bring your vision
              to life — with quality, precision and care.
            </p>

            <div className="story-features">

              <div>
                <span>
                  <Layers3 size={17} />
                </span>

                <p>
                  Premium
                  <br />
                  Materials
                </p>
              </div>

              <div>
                <span>
                  <Home size={17} />
                </span>

                <p>
                  Custom
                  <br />
                  Designs
                </p>
              </div>

              <div>
                <span>
                  <Ruler size={17} />
                </span>

                <p>
                  Expert
                  <br />
                  Installation
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="contact-services">

        <div className="contact-centered-heading">

          <div className="contact-eyebrow centered">

            <span></span>

            <span>OUR SERVICES</span>

            <span></span>

          </div>

          <h2>
            Have a specific need?
          </h2>

          <p>
            Choose what you're interested in, and our
            team will help you get started.
          </p>

        </div>


        <div className="service-grid">

          <a
            href="#contact-form"
            className="service-card"
          >

            <div className="service-icon">
              <Home size={19} />
            </div>

            <div>

              <h3>
                Full Kitchen Remodel
              </h3>

              <p>
                Transform your existing kitchen into
                a modern, functional space.
              </p>

            </div>

            <span className="service-arrow">
              <ArrowRight size={15} />
            </span>

          </a>


          <a
            href="#contact-form"
            className="service-card"
          >

            <div className="service-icon">
              <Building2 size={19} />
            </div>

            <div>

              <h3>
                New Home Kitchen
              </h3>

              <p>
                Build your dream kitchen from the
                ground up.
              </p>

            </div>

            <span className="service-arrow">
              <ArrowRight size={15} />
            </span>

          </a>


          <a
            href="#contact-form"
            className="service-card"
          >

            <div className="service-icon">
              <Layers3 size={19} />
            </div>

            <div>

              <h3>
                Countertop & Hardware
              </h3>

              <p>
                Premium surfaces and high-quality
                hardware for lasting beauty.
              </p>

            </div>

            <span className="service-arrow">
              <ArrowRight size={15} />
            </span>

          </a>


          <a
            href="#contact-form"
            className="service-card"
          >

            <div className="service-icon">
              <User size={19} />
            </div>

            <div>

              <h3>
                Site Consultation
              </h3>

              <p>
                Get expert advice and on-site
                measurement support.
              </p>

            </div>

            <span className="service-arrow">
              <ArrowRight size={15} />
            </span>

          </a>

        </div>

      </section>


      {/* =====================================================
          GET IN TOUCH
      ===================================================== */}

      <section className="contact-location-section">

        <div className="location-intro">

          <div className="contact-eyebrow">

            <span></span>

            <span>GET IN TOUCH</span>

            <span></span>

          </div>

          <h2>
            We’re here
            <br />
            <em>to help.</em>
          </h2>


          <div className="contact-details">

            <div className="contact-detail">

              <span>
                <MessageCircle size={17} />
              </span>

              <div>
                <strong>
                  +91 98765 43210
                </strong>

                <small>
                  Mon - Sat, 9AM - 7PM
                </small>
              </div>

            </div>


            <div className="contact-detail">

              <span>
                <Mail size={17} />
              </span>

              <div>
                <strong>
                  hello@kitchen.com
                </strong>

                <small>
                  We’ll reply within 24 hrs
                </small>
              </div>

            </div>


            <div className="contact-detail">

              <span>
                <MapPin size={17} />
              </span>

              <div>
                <strong>
                  Kerala, India
                </strong>

                <small>
                  Our Studio Locations
                </small>
              </div>

            </div>

          </div>

        </div>


        {/* LOCATION MAP */}

        <div className="location-map-area">

          <div className="fake-map">

            <div className="map-road road-one"></div>
            <div className="map-road road-two"></div>
            <div className="map-road road-three"></div>
            <div className="map-road road-four"></div>

            <div className="map-pin pin-one">
              <MapPin size={17} />
            </div>

            <div className="map-pin pin-two">
              <MapPin size={17} />
            </div>

            <div className="map-pin pin-three">
              <MapPin size={17} />
            </div>

            <div className="map-pin pin-four">
              <MapPin size={17} />
            </div>

          </div>


          <div className="location-info-card">

            <h3>
              Our Studio Locations
            </h3>

            <div className="studio-location">

              <strong>
                Kochi (Head Office)
              </strong>

              <span>
                MG Road, Kochi, Kerala - 682016
              </span>

            </div>

            <div className="studio-location">

              <strong>
                Calicut
              </strong>

              <span>
                Mavoor Road, Kozhikode, Kerala - 673001
              </span>

            </div>

            <div className="studio-location">

              <strong>
                Trivandrum
              </strong>

              <span>
                NH Bypass, Trivandrum, Kerala - 695001
              </span>

            </div>


            <div className="location-social">

              <span>
                Follow Us
              </span>

              <div>

                <a href="https://instagram.com">
                  <FaInstagram size={14} />
                </a>

                <a href="https://facebook.com">
                  <FaFacebook size={14} />
                </a>

                <a href="https://youtube.com">
                  <FaYoutube size={14} />
                </a>

                <a href="https://linkedin.com">
                  <FaLinkedin size={14} />
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="contact-final-cta">

        <div className="final-cta-content">

          <div className="final-cta-heading">

            <div className="final-cta-eyebrow">
              <span></span>
              LET’S CREATE TOGETHER
            </div>

            <h2>
              Your next kitchen could start
              <br />
              with <em>one conversation.</em>
            </h2>

          </div>


          <a
            href="#contact-form"
            className="final-cta-button"
          >

            <MessageCircle size={16} />

            <span>
              Chat on WhatsApp
            </span>

            <ArrowRight size={15} />

          </a>

        </div>

      </section>

    </main>
  );
};

export default ContactPage;