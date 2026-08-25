import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Clock3,
  MessageCircle
} from "lucide-react";
import "./ContactPage.css";


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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Data:", formData);
  };

  return (
    <main className="contact-page">
      {/* =====================================================
          HERO & INTRO HEADER
      ===================================================== */}
      <section className="contact-hero-section">
        <div className="contact-container">
          <div className="contact-header-content">
            <span className="contact-eyebrow">
              GET IN TOUCH
            </span>
            <h1>
              Let’s create a space
              <br />
              <span>that feels like home.</span>
            </h1>
            <p>
              Whether you are planning a complete modular kitchen, renovating your current space, or exploring custom finishes, our design studio in Calicut is ready to help.
            </p>
          </div>

          {/* =====================================================
              BENTO GRID LAYOUT (MAIN FORM + QUICK CARDS)
          ===================================================== */}
          <div className="contact-bento-grid">
            
            {/* LEFT COLUMN: CONTACT FORM */}
            <div className="contact-form-card">
              <div className="form-card-header">
                <span className="bento-badge">DIRECT ENQUIRY</span>
                <h2>Tell us about your project</h2>
                <p>Fill in your details and our team will get in touch within 24 hours.</p>
              </div>

              <form className="contact-form-body" onSubmit={handleSubmit}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Kitchen Layout / Project</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                    >
                      <option>L-Shaped Kitchen</option>
                      <option>Parallel / Galley Kitchen</option>
                      <option>Island Kitchen</option>
                      <option>U-Shaped Kitchen</option>
                      <option>Full Home Interior</option>
                      <option>Kitchen Renovation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Message / Space Details</label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your kitchen size, location, preferred materials, or timeline..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-submit-row">
                  <span>We keep your information strictly confidential.</span>
                  <button type="submit" className="contact-btn-primary">
                    Send Enquiry
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: BENTO CONTACT TILES */}
            <div className="contact-side-tiles">
              
              {/* STUDIO CARD */}
              <div className="bento-tile studio-tile">
                <div className="tile-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="tile-text">
                  <span className="tile-sub">VISIT STUDIO</span>
                  <h3>Calicut, Kerala</h3>
                  <p>Experience working kitchen displays, quartz countertops, and hardware mechanisms in person.</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Calicut%2C%20Kerala"
                    target="_blank"
                    rel="noreferrer"
                    className="tile-link"
                  >
                    Open in Google Maps
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* QUICK CHAT / CALL TILES ROW */}
              <div className="side-sub-grid">
                <a href="tel:+919876543210" className="bento-tile mini-tile">
                  <div className="tile-icon-box">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="tile-sub">PHONE CONSULTATION</span>
                    <strong>+91 98765 43210</strong>
                  </div>
                  <ArrowUpRight size={14} className="tile-corner-arrow" />
                </a>

                <a href="mailto:hello@yourstudio.com" className="bento-tile mini-tile">
                  <div className="tile-icon-box">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="tile-sub">DIRECT EMAIL</span>
                    <strong>hello@yourstudio.com</strong>
                  </div>
                  <ArrowUpRight size={14} className="tile-corner-arrow" />
                </a>
              </div>

              {/* WHATSAPP INSTANT BOX */}
              <div className="bento-tile whatsapp-tile">
                <div className="whatsapp-tile-content">
                  <div className="tile-icon-box ws-icon">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className="tile-sub">QUICKEST RESPONSE</span>
                    <h4>Chat directly with our designers</h4>
                    <small>Share floor plans or photos for instant guidance.</small>
                  </div>
                </div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="ws-btn"
                >
                  Chat on WhatsApp
                  <ArrowUpRight size={15} />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAP & HOURS SECTION
      ===================================================== */}
      <section className="contact-map-section">
        <div className="contact-container">
          <div className="map-panel">
            <iframe
              title="Studio Location"
              src="https://www.google.com/maps?q=Calicut%2C%20Kerala&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-floating-details">
              <div className="map-detail-block">
                <Clock3 size={18} />
                <div>
                  <strong>Studio Hours</strong>
                  <p>Monday – Saturday: 9:30 AM – 6:30 PM (Sundays by appointment)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;