import React, { useState } from "react";
import "../../styles/HomeStyles/kitchenConfigurator.css";

import img1 from "../../images/kitchen/L-Matte.jpg";
import img2 from "../../images/kitchen/L-White.jpg";
import img3 from "../../images/kitchen/L-Wood.jpg";
import img4 from "../../images/kitchen/L-Black.jpg";

import img11 from "../../images/kitchen/U-Matte1.jpg";
import img22 from "../../images/kitchen/U-White1.jpg";
import img33 from "../../images/kitchen/U-Wood1.jpg";
import img44 from "../../images/kitchen/U-Black1.jpg";

import img111 from "../../images/kitchen/I-Matte1.jpg";
import img222 from "../../images/kitchen/I-White1.jpeg";
import img333 from "../../images/kitchen/I-Wood1.jpeg";
import img444 from "../../images/kitchen/I-Black1.jpg";

const kitchenData = {
  "L-Shape": {
    "Matte Beige": {
      image: img1,
      price: 180000,
    },
    "White Gloss": {
      image: img2,
      price: 195000,
    },
    Walnut: {
      image: img3,
      price: 220000,
    },
    "Black Matte": {
      image: img4,
      price: 210000,
    },
  },

  "U-Shape": {
    "Matte Beige": {
      image: img11,
      price: 220000,
    },
    "White Gloss": {
      image: img22,
      price: 235000,
    },
    Walnut: {
      image: img33,
      price: 260000,
    },
    "Black Matte": {
      image: img44,
      price: 250000,
    },
  },

  Island: {
    "Matte Beige": {
      image: img111,
      price: 280000,
    },
    "White Gloss": {
      image: img222,
      price: 295000,
    },
    Walnut: {
      image: img333,
      price: 330000,
    },
    "Black Matte": {
      image: img444,
      price: 320000,
    },
  },
};

const layoutOptions = ["L-Shape", "U-Shape", "Island"];

const finishOptions = [
  "Matte Beige",
  "White Gloss",
  "Walnut",
  "Black Matte",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function KitchenConfigurator() {
  const [layout, setLayout] = useState("L-Shape");
  const [finish, setFinish] = useState("Matte Beige");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedKitchen = kitchenData[layout][finish];

  const sendToWhatsApp = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const projectType = formData.get("projectType");
    const message = formData.get("message");

    const whatsappMessage = `
Hello, I would like to book a kitchen design consultation.

Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}
Project Type: ${projectType}

Kitchen Configuration:
Layout: ${layout}
Finish: ${finish}
Estimated Investment: ${formatPrice(selectedKitchen.price)}

Project Details:
${message || "Not provided"}
`;

    const whatsappNumber = "919XXXXXXXXX";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");

    setIsModalOpen(false);
  };

  return (
    <>
      <section className="kitchen-configurator">

        <div className="configurator-header">
          <div className="configurator-eyebrow">
            <span />
            KITCHEN CONFIGURATOR
          </div>

          <div className="configurator-title-wrap">
            <h2>
              Design a kitchen
              <br />
              <em>that feels like home.</em>
            </h2>

            <p>
              Explore our signature layouts and finishes to create a
              kitchen designed around the way you live.
            </p>
          </div>
        </div>

        <div className="configurator-grid">

          {/* PREVIEW */}

          <div className="kitchen-preview">

            <div className="preview-image-wrap">
              <img
                key={`${layout}-${finish}`}
                src={selectedKitchen.image}
                alt={`${layout} kitchen in ${finish}`}
              />
            </div>

            <div className="preview-overlay" />

            <div className="preview-top">
              <span>YOUR SELECTION</span>

              <span>
                {layout === "L-Shape"
                  ? "01"
                  : layout === "U-Shape"
                  ? "02"
                  : "03"}
              </span>
            </div>

            <div className="preview-label">
              <span>{layout}</span>
              <strong>{finish}</strong>
            </div>

            <div className="preview-bottom">
              <span>Estimated from</span>
              <strong>{formatPrice(selectedKitchen.price)}</strong>
            </div>
          </div>


          {/* OPTIONS */}

          <div className="configurator-options">

            <div className="config-step">

              <div className="step-heading">
                <span>01</span>

                <div>
                  <small>CHOOSE YOUR</small>
                  <h3>Kitchen Layout</h3>
                </div>
              </div>

              <div className="premium-options">
                {layoutOptions.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    className={layout === option ? "active" : ""}
                    onClick={() => setLayout(option)}
                  >
                    <span className="option-number">
                      0{index + 1}
                    </span>

                    <span>{option}</span>

                    <span className="option-arrow">↗</span>
                  </button>
                ))}
              </div>

            </div>


            <div className="config-step">

              <div className="step-heading">
                <span>02</span>

                <div>
                  <small>CHOOSE YOUR</small>
                  <h3>Cabinet Finish</h3>
                </div>
              </div>

              <div className="finish-options">

                {finishOptions.map((option) => {

                  const finishClass = option
                    .toLowerCase()
                    .replace(" ", "-");

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`finish-option ${
                        finish === option ? "active" : ""
                      }`}
                      onClick={() => setFinish(option)}
                    >
                      <span
                        className={`finish-swatch ${finishClass}`}
                      />

                      <span>{option}</span>

                      {finish === option && (
                        <span className="check">✓</span>
                      )}
                    </button>
                  );
                })}

              </div>

            </div>


            {/* PRICE */}

            <div className="estimate-card">

              <div className="estimate-top">
                <span>03 / YOUR ESTIMATE</span>

                <span className="estimate-dot" />
              </div>

              <div className="estimate-price">
                {formatPrice(selectedKitchen.price)}
              </div>

              <p>
                Indicative investment based on your selected layout
                and finish. Final pricing will be confirmed after
                measurements and material selection.
              </p>

              <div className="estimate-selection">

                <div>
                  <span>Layout</span>
                  <strong>{layout}</strong>
                </div>

                <div>
                  <span>Finish</span>
                  <strong>{finish}</strong>
                </div>

              </div>

            </div>


            {/* CTA */}

            <button
              className="consultation-btn"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Book a Private Consultation</span>

              <span className="consultation-arrow">
                ↗
              </span>
            </button>

            <p className="consultation-note">
              Complimentary design consultation · No obligation
            </p>

          </div>
        </div>
      </section>


      {/* APPOINTMENT MODAL */}

      {isModalOpen && (

        <div
          className="appointment-overlay"
          onClick={() => setIsModalOpen(false)}
        >

          <div
            className="appointment-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>


            <div className="modal-eyebrow">
              <span />
              PRIVATE CONSULTATION
            </div>


            <h2>
              Let's create
              <br />
              <em>your kitchen.</em>
            </h2>

            <p className="modal-description">
              Share a few details about your project and our design
              team will connect with you personally.
            </p>


            {/* SELECTED DESIGN */}

            <div className="modal-selection">

              <div>
                <small>LAYOUT</small>
                <strong>{layout}</strong>
              </div>

              <div>
                <small>FINISH</small>
                <strong>{finish}</strong>
              </div>

              <div>
                <small>ESTIMATE</small>
                <strong>
                  {formatPrice(selectedKitchen.price)}
                </strong>
              </div>

            </div>


            <form onSubmit={sendToWhatsApp}>

              <div className="form-row">

                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  required
                />

                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  required
                />

              </div>


              <input
                name="phone"
                type="tel"
                placeholder="Phone number"
                required
              />


              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
              />


              <select
                name="projectType"
                defaultValue=""
                required
              >

                <option value="" disabled>
                  Project type
                </option>

                <option>
                  New Kitchen
                </option>

                <option>
                  Kitchen Renovation
                </option>

                <option>
                  Complete Interior
                </option>

              </select>


              <textarea
                name="message"
                rows="4"
                placeholder="Tell us about your project..."
              />


              <button
                className="modal-submit"
                type="submit"
              >

                <span>
                  Continue to WhatsApp
                </span>

                <span>↗</span>

              </button>

            </form>


            <div className="modal-footer">
              Your selected design will be included in the
              consultation request.
            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default KitchenConfigurator;