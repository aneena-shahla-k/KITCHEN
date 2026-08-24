import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";

import "./kitchenPackages.css";

const packages = [
  {
    id: "essential",
    number: "01",
    name: "Essential",
    tagline: "Practical kitchens for everyday living.",
    price: "₹2.5L",
    priceText: "Starting from",

    finish: "Laminate",
    hardware: "Standard hardware",
    storage: "Essential storage",
    accessories: "Basic accessories",

    description:
      "A practical kitchen package covering the essentials for a functional and well-organised space.",

    bestFor:
      "Small to medium-sized kitchens",

    features: [
      "Modular base cabinets",
      "Wall cabinets",
      "Laminate finish",
      "Standard hardware",
      "Essential storage units",
      "Basic kitchen accessories",
      "Standard installation",
    ],
  },

  {
    id: "plus",
    number: "02",
    name: "Plus",
    tagline: "More storage, better finishes, everyday comfort.",
    price: "₹3.5L",
    priceText: "Starting from",

    finish: "Acrylic / Premium Laminate",
    hardware: "Soft-close hardware",
    storage: "Enhanced storage",
    accessories: "Selected accessories",

    description:
      "A balanced package for homeowners looking for improved finishes, smoother hardware and better storage.",

    bestFor:
      "Medium-sized kitchens",

    features: [
      "Modular base & wall cabinets",
      "Premium finish options",
      "Soft-close hardware",
      "Improved storage solutions",
      "Selected kitchen accessories",
      "Better internal organisation",
      "Standard installation",
    ],

    popular: true,
  },

  {
    id: "signature",
    number: "03",
    name: "Signature",
    tagline: "Refined materials and elevated functionality.",
    price: "₹5L",
    priceText: "Starting from",

    finish: "PU / Natural Veneer",
    hardware: "Premium hardware",
    storage: "Advanced storage",
    accessories: "Premium accessories",

    description:
      "A more refined kitchen package combining premium finishes, advanced storage and upgraded hardware.",

    bestFor:
      "Large or design-focused kitchens",

    features: [
      "Premium modular cabinetry",
      "PU / veneer finish options",
      "Premium soft-close hardware",
      "Advanced storage systems",
      "Premium kitchen accessories",
      "Enhanced internal fittings",
      "Professional installation",
    ],
  },
];

const KitchenPackages = () => {
  const [activePackage, setActivePackage] = useState(null);

  const togglePackage = (id) => {
    setActivePackage((prev) =>
      prev === id ? null : id
    );
  };

  return (
    <section
      className="kitchen-packages"
      id="packages"
    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="packages-header">

        <div className="packages-heading">

          <span className="packages-label">
            KITCHEN PACKAGES
          </span>

          <h2>
            A package for
            <br />
            <span>every kitchen.</span>
          </h2>

        </div>

        <div className="packages-intro">

          <p>
            Choose a starting package based on
            your budget, finish preferences and
            everyday requirements.
          </p>

          <span className="packages-note">
            All packages can be customised to suit
            your kitchen.
          </span>

        </div>

      </div>


      {/* ==========================================
          PACKAGE CARDS
      ========================================== */}

      <div className="packages-grid">

        {packages.map((item) => {

          const isActive =
            activePackage === item.id;

          return (
            <article
              key={item.id}
              className={`package-card ${
                item.popular
                  ? "package-card-popular"
                  : ""
              } ${
                isActive
                  ? "package-card-open"
                  : ""
              }`}
            >

              {/* TOP */}

              <div className="package-card-top">

                <div className="package-number">
                  {item.number}
                </div>

                {item.popular && (
                  <span className="package-popular">
                    MOST POPULAR
                  </span>
                )}

              </div>


              {/* TITLE */}

              <div className="package-title">

                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.tagline}
                </p>

              </div>


              {/* PRICE */}

              <div className="package-price">

                <span>
                  {item.priceText}
                </span>

                <strong>
                  {item.price}
                </strong>

              </div>


              {/* QUICK DETAILS */}

              <div className="package-details">

                <div className="package-detail">

                  <span>
                    Finish
                  </span>

                  <strong>
                    {item.finish}
                  </strong>

                </div>

                <div className="package-detail">

                  <span>
                    Hardware
                  </span>

                  <strong>
                    {item.hardware}
                  </strong>

                </div>

                <div className="package-detail">

                  <span>
                    Storage
                  </span>

                  <strong>
                    {item.storage}
                  </strong>

                </div>

                <div className="package-detail">

                  <span>
                    Accessories
                  </span>

                  <strong>
                    {item.accessories}
                  </strong>

                </div>

              </div>


              {/* DESCRIPTION */}

              <p className="package-description">
                {item.description}
              </p>


              {/* EXPAND */}

              <button
                type="button"
                className="package-expand"
                onClick={() =>
                  togglePackage(item.id)
                }
              >

                <span>
                  {isActive
                    ? "Hide details"
                    : "View what's included"}
                </span>

                <ChevronDown
                  size={15}
                  className={
                    isActive
                      ? "package-chevron rotated"
                      : "package-chevron"
                  }
                />

              </button>


              {/* EXPANDED DETAILS */}

              <div
                className={`package-expanded ${
                  isActive
                    ? "expanded"
                    : ""
                }`}
              >

                <div className="package-expanded-inner">

                  <span className="included-label">
                    INCLUDED IN THIS PACKAGE
                  </span>

                  <ul>

                    {item.features.map(
                      (feature) => (
                        <li key={feature}>

                          <span className="feature-check">
                            <Check size={11} />
                          </span>

                          {feature}

                        </li>
                      )
                    )}

                  </ul>

                  <div className="package-best-for">

                    <span>
                      BEST FOR
                    </span>

                    <strong>
                      {item.bestFor}
                    </strong>

                  </div>

                </div>

              </div>


              {/* CTA */}

              <a
                href="/contact"
                className="package-cta"
              >

                <span>
                  Get a quote
                </span>

                <ArrowRight size={15} />

              </a>

            </article>
          );
        })}

      </div>


      {/* ==========================================
          FOOTNOTE
      ========================================== */}

      <div className="packages-footer">

        <div className="packages-footer-line" />

        <p>
          Package prices are indicative starting
          ranges. Final pricing depends on kitchen
          measurements, selected materials, hardware,
          accessories and design requirements.
        </p>

        <a href="/contact">
          Need something customised?
          <ArrowRight size={14} />
        </a>

      </div>

    </section>
  );
};

export default KitchenPackages;