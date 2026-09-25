import React, { useState } from "react";
import "./KitchenPricing.css";

import kitchenImage from "../../images/home/home.png";


import cabinetImg from "../../images/home/cabinet.jpg";
import wallCabinetImg from "../../images/home/wall-cabinet.jpg";
import countertopImg from "../../images/home/counter-top.jpg";
import hardwareImg from "../../images/material/finehard.jpg";
import installationImg from "../../images/home/installation.jpg";

// =========================================================
// COMPONENT
// =========================================================

const KitchenPricing = () => {

  const [activeQuality, setActiveQuality] = useState("essential");


  // =======================================================
  // PRICING DATA
  // =======================================================

  const pricingData = {

    essential: {
      total: "₹2,05,000+",

      items: [
        {
          name: "Base Cabinets",
          material: "Laminate",
          quality: "High Durability",
          price: "₹55,760",
          image: cabinetImg,
        },
        {
          name: "Wall Cabinets",
          material: "Premium Laminate",
          quality: "Moisture Resistant",
          price: "₹34,440",
          image: wallCabinetImg,
        },
        {
          name: "Countertop",
          material: "Engineered Quartz",
          quality: "Premium",
          price: "₹63,960",
          image: countertopImg,
        },
        {
          name: "Hardware",
          material: "Soft-Close",
          quality: "Premium Grade",
          price: "₹31,160",
          image: hardwareImg,
        },
        
         {
          name: "Installation",
          material: "Professional",
          quality: "Expert Team",
          price: "₹20,000",
          image: installationImg,
        },
      ],
    },


    standard: {
      total: "₹2,75,000+",

      items: [
        {
          name: "Base Cabinets",
          material: "Premium Laminate",
          quality: "High Durability",
          price: "₹1,10,000",
          image: cabinetImg,
        },
        {
          name: "Wall Cabinets",
          material: "Premium Veneer",
          quality: "Moisture Resistant",
          price: "₹72,000",
          image: wallCabinetImg,
        },
        {
          name: "Countertop",
          material: "Premium Quartz",
          quality: "Premium Grade",
          price: "₹1,05,000",
          image: countertopImg,
        },
        {
          name: "Hardware",
          material: "Soft-Close",
          quality: "Premium Hardware",
          price: "₹38,000",
          image: hardwareImg,
        },
        
        {
          name: "Installation",
          material: "Professional",
          quality: "Expert Team",
          price: "₹20,000",
          image: installationImg,
        },
      ],
    },


    luxury: {
      total: "₹4,50,000+",

      items: [
        {
          name: "Base Cabinets",
          material: "PU / Veneer",
          quality: "Luxury Finish",
          price: "₹1,85,000",
          image: cabinetImg,
        },
        {
          name: "Wall Cabinets",
          material: "Premium Veneer",
          quality: "Luxury Grade",
          price: "₹1,10,000",
          image: wallCabinetImg,
        },
        {
          name: "Countertop",
          material: "Premium Quartz",
          quality: "Luxury Grade",
          price: "₹1,05,000",
          image: countertopImg,
        },
        {
          name: "Hardware",
          material: "Premium Soft-Close",
          quality: "Luxury Hardware",
          price: "₹55,000",
          image: hardwareImg,
        },
      
        {
          name: "Installation",
          material: "Professional",
          quality: "Expert Installation",
          price: "₹30,000",
          image: installationImg,
        },
      ],
    },

  };


  const currentPricing = pricingData[activeQuality];


  // =======================================================
  // JSX
  // =======================================================

  return (

    <section className="transparent-pricing">

      <div className="transparent-pricing-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="pricing-header">

          <div className="pricing-header-left">

            <div className="pricing-eyebrow">

              <span></span>

              <p>
                TRANSPARENT PRICING
              </p>

            </div>


            <h2>
              Know What You're
              <br />
              Paying For
            </h2>


            <p className="pricing-description">
              Premium materials, quality craftsmanship and
              expert installation. Here's a clear breakdown
              of what goes into your kitchen.
            </p>

          </div>

        </div>


        {/* =================================================
            QUALITY FILTER
        ================================================= */}

        <div className="pricing-filter-wrapper">

          <div className="pricing-filter-label">

            <span></span>

            <p>
              CHOOSE YOUR QUALITY
            </p>

          </div>


          <div className="pricing-filters">

            <button
              type="button"
              className={
                activeQuality === "essential"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveQuality("essential")
              }
            >
              Essential
            </button>


            <button
              type="button"
              className={
                activeQuality === "standard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveQuality("standard")
              }
            >
              Standard
            </button>


            <button
              type="button"
              className={
                activeQuality === "luxury"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveQuality("luxury")
              }
            >
              Luxury
            </button>

          </div>

        </div>


        {/* =================================================
            PRICING CONTENT
        ================================================= */}

        <div className="pricing-content">


          {/* ===============================================
              KITCHEN IMAGE
          =============================================== */}

          <div className="pricing-image-column">

            <div className="pricing-main-image">

              <img
                src={kitchenImage}
                alt="Modern modular kitchen"
              />

            </div>


            {/* Project cost card */}

            <div className="pricing-cost-card">

              <div className="pricing-cost-content">

                <span className="cost-label">
                  ESTIMATED PROJECT COST
                </span>


                <strong>
                  {currentPricing.total}
                </strong>


                <p>
                  For an {activeQuality} modular kitchen
                </p>


                <button
                  type="button"
                  className="pricing-quote-button"
                >
                  Get Detailed Quote

                  <span>
                    →
                  </span>

                </button>

              </div>


              {/* Material samples */}

              <div className="pricing-material-samples">

                <span className="sample sample-one"></span>

                <span className="sample sample-two"></span>

                <span className="sample sample-three"></span>

                <span className="sample sample-four"></span>

              </div>

            </div>

          </div>


          {/* ===============================================
              TABLE
          =============================================== */}

          <div className="pricing-table">


            {/* Table heading */}

            <div className="pricing-table-head">

              <span>
                COMPONENT
              </span>

              <span>
                MATERIAL & QUALITY
              </span>

              <span>
                ESTIMATED PRICE
              </span>

            </div>


            {/* Table rows */}

            <div className="pricing-table-body">

              {currentPricing.items.map(
                (item, index) => (

                  <div
                    className="pricing-row"
                    key={`${activeQuality}-${index}`}
                  >


                    {/* Component */}

                    <div className="pricing-component">

                      <div className="pricing-thumb">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      </div>


                      <div className="pricing-component-text">

                        <h3>
                          {item.name}
                        </h3>

                      </div>

                    </div>


                    {/* Material */}

                    <div className="pricing-material">

                      <span className="material-name">
                        {item.material}
                      </span>

                      <span className="material-quality">
                        {item.quality}
                      </span>

                    </div>


                    {/* Price */}

                    <div className="pricing-price">

                      {item.price}

                    </div>

                  </div>

                )
              )}

            </div>


            {/* =============================================
                TABLE FOOTER
            ============================================= */}

            <div className="pricing-table-footer">


              <div className="pricing-total">

                <span>
                  ESTIMATED PROJECT COST
                </span>

                <strong>
                  {currentPricing.total}
                </strong>

                <p>
                  Final pricing depends on measurements,
                  material selection, hardware, accessories
                  and installation requirements.
                </p>

              </div>


              <button
                type="button"
                className="pricing-footer-button"
              >
                Get Detailed Quote

                <span>
                  →
                </span>

              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            BOTTOM BENEFITS
        ================================================= */}

        <div className="pricing-benefits">


          <div className="pricing-benefit">

            <div className="benefit-icon">
              ◇
            </div>

            <div>
              <strong>
                Premium Materials
              </strong>

              <span>
                Built to last
              </span>
            </div>

          </div>


          <div className="pricing-benefit">

            <div className="benefit-icon">
              ⚙
            </div>

            <div>
              <strong>
                Expert Installation
              </strong>

              <span>
                Professional team
              </span>
            </div>

          </div>


          <div className="pricing-benefit">

            <div className="benefit-icon">
              ◇
            </div>

            <div>
              <strong>
                Thoughtful Accessories
              </strong>

              <span>
                For everyday ease
              </span>
            </div>

          </div>


          <div className="pricing-benefit">

            <div className="benefit-icon">
              ♧
            </div>

            <div>
              <strong>
                Ongoing Support
              </strong>

              <span>
                Always with you
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>

  );
};

export default KitchenPricing;