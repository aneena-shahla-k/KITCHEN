import React from "react";
import "./WhyChooseUs.css";

// Replace these with your actual image paths
import designedImg from "../../images/home/home.png";
import materialsImg from "../../images/material/acrylicc.jpg";
import storageImg from "../../images/home/smart-storage.jpg";
import installationImg from "../../images/home/installation.jpg";
import warrantyImg from "../../images/home/warranty.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      number: "01",
      title: (
        <>
          Designed for
          <br />
          Your Space
        </>
      ),
      description:
        "Every kitchen is customized to your room dimensions, lifestyle and storage requirements.",
      image: designedImg,
    },
    {
      number: "02",
      title: (
        <>
          Quality
          <br />
          Materials
        </>
      ),
      description:
        "Show actual material samples, hardware and finishes.",
      image: materialsImg,
    },
    {
      number: "03",
      title: (
        <>
          Smart
          <br />
          Storage
        </>
      ),
      description:
        "Demonstrate corner units, pull-outs, tall units, drawers and pantry systems.",
      image: storageImg,
    },
    {
      number: "04",
      title: (
        <>
          Professional
          <br />
          Installation
        </>
      ),
      description:
        "Show installation teams and finished projects.",
      image: installationImg,
    },
    {
      number: "05",
      title: (
        <>
          Warranty &
          <br />
          Support
        </>
      ),
      description:
        "Clearly explain the applicable product and installation warranties.",
      image: warrantyImg,
    },
  ];

  return (
    <section className="why-choose-section">
      {/* Decorative leaves */}
      <div className="why-leaf-decoration">
        <span className="leaf leaf-1"></span>
        <span className="leaf leaf-2"></span>
        <span className="leaf leaf-3"></span>
        <span className="leaf leaf-4"></span>
        <span className="leaf leaf-5"></span>
      </div>

      <div className="why-choose-container">

        {/* =========================
            HEADER
        ========================== */}
        <div className="why-choose-header">

          <div className="why-section-label">
            <span className="why-label-line"></span>
            <span>WHY CHOOSE US</span>
          </div>

          <h2 className="why-choose-title">
            Why choose us?
          </h2>

          <p className="why-choose-intro">
            We go beyond beautiful kitchens — we bring expertise,
            <br/>
            quality and complete support, at every step.
          </p>

          <div className="why-header-script">
            <span>Better Kitchens.</span>
            <span>Brighter Living.</span>
          </div>

        </div>


        {/* =========================
            CARDS
        ========================== */}
        <div className="why-choose-grid">

          {features.map((feature, index) => (
            <article
              className="why-feature-card"
              key={feature.number}
              style={{
                "--card-index": index,
              }}
            >

              {/* Image */}
              <div className="why-feature-image">
                <img
                  src={feature.image}
                  alt=""
                  loading="lazy"
                />

                <div className="why-image-overlay"></div>
              </div>


              {/* Card content */}
              <div className="why-feature-content">

                {/* Title */}
                <h3 className="why-feature-title">
                  {feature.title}
                </h3>

                {/* Small divider */}
                <div className="why-feature-divider"></div>

                {/* Description */}
                <p className="why-feature-description">
                  {feature.description}
                </p>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;