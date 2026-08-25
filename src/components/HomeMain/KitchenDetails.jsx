import React, { useState } from "react";
import { ArrowUpRight, Plus, X, Layers, Ruler, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./KitchenDetails.css";

import kitchenImage from "../../images/kitchen.jpg";

const details = [
  {
    id: 1,
    number: "01",
    title: "Smart Storage",
    subtitle: "Full-Height Modular Pantry & Drawers",
    description:
      "Tall units, deep drawers and carefully planned storage keep everyday essentials organised without taking over the workspace.",
    position: {
      top: "20%",
      left: "10%",
    },
    specs: {
      width: "900 mm",
      height: "2100 mm",
      depth: "600 mm",
      material: "High-Density Marine Ply (BWP)",
      finish: "Anti-Fingerprint Matte Laminate",
      hardware: "Tandem Soft-Close Runners",
      loadCapacity: "65 kg per drawer"
    },
    blueprintType: "tall-unit"
  },
  {
    id: 2,
    number: "02",
    title: "Premium Countertop",
    subtitle: "Seamless Quartz Workstation",
    description:
      "Durable finishes are selected to balance the look you want with the everyday demands of an Indian kitchen.",
    position: {
      top: "59%",
      left: "35%",
    },
    specs: {
      width: "2400 mm",
      height: "860 mm",
      depth: "650 mm",
      thickness: "20 mm Chamfered",
      material: "Engineered Quartz",
      heatResistance: "Up to 220°C",
      finish: "Honed Suede Finish"
    },
    blueprintType: "countertop"
  },
  {
    id: 3,
    number: "03",
    title: "Practical Lighting",
    subtitle: "Concealed Task & Ambient Array",
    description:
      "Layered lighting keeps the worktop clear and comfortable while adding warmth to the overall space.",
    position: {
      top: "25%",
      left: "70%",
    },
    specs: {
      diameter: "Ø 280 mm (Pendant)",
      beamAngle: "120° Wide Flood",
      colorTemp: "3000K Warm White",
      cri: "95+ CRI TrueColor",
      driver: "Concealed Dimmable LED",
      voltage: "24V Low-Voltage Safe"
    },
    blueprintType: "lighting"
  },
  {
    id: 4,
    number: "04",
    title: "Smooth Hardware",
    subtitle: "Integrated Soft-Close System",
    description:
      "Soft-close drawers and quality hardware make the kitchen feel better every time you open and close it.",
    position: {
      top: "42%",
      left: "94%",
    },
    specs: {
      hingeAngle: "110° Opening Arc",
      cycleTest: "200,000 Open/Close Cycles",
      material: "Zinc Alloy + Nickel Plated",
      adjustment: "3-Way Spatial Cam Adjustment",
      damping: "Integrated Hydraulic Piston"
    },
    blueprintType: "hardware"
  },
];

const BlueprintDiagram = ({ type }) => {
  if (type === "tall-unit") {
    return (
      <svg viewBox="0 0 280 200" className="blueprint-svg">
        <rect x="70" y="20" width="140" height="160" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="80" y="30" width="120" height="40" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="80" y="75" width="120" height="45" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="80" y="125" width="120" height="45" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
        {/* Dimensions */}
        <line x1="55" y1="20" x2="55" y2="180" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#arrow)" />
        <text x="30" y="105" fill="#f59e0b" fontSize="10" transform="rotate(-90 45,105)">2100mm</text>
        <line x1="70" y1="190" x2="210" y2="190" stroke="#f59e0b" strokeWidth="1" />
        <text x="125" y="198" fill="#f59e0b" fontSize="10">900mm</text>
      </svg>
    );
  }
  if (type === "lighting") {
    return (
      <svg viewBox="0 0 280 200" className="blueprint-svg">
        <line x1="140" y1="10" x2="140" y2="70" stroke="#60a5fa" strokeWidth="1.5" />
        <path d="M100 110 C100 70, 180 70, 180 110 Z" fill="none" stroke="#93c5fd" strokeWidth="2" />
        <circle cx="140" cy="115" r="8" fill="#fbbf24" opacity="0.6" />
        <path d="M70 180 L140 120 L210 180" stroke="#60a5fa" strokeDasharray="4 4" strokeWidth="1" />
        {/* Diameter Dimension */}
        <line x1="100" y1="125" x2="180" y2="125" stroke="#f59e0b" strokeWidth="1" />
        <text x="122" y="138" fill="#f59e0b" fontSize="10">Ø 280mm</text>
      </svg>
    );
  }
  if (type === "hardware") {
    return (
      <svg viewBox="0 0 280 200" className="blueprint-svg">
        <rect x="80" y="60" width="40" height="80" rx="4" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
        <circle cx="100" cy="80" r="5" fill="#60a5fa" />
        <circle cx="100" cy="120" r="5" fill="#60a5fa" />
        <path d="M120 100 L180 70 L180 130 Z" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M130 90 A30 30 0 0 1 170 85" stroke="#f59e0b" strokeWidth="1" fill="none" />
        <text x="145" y="78" fill="#f59e0b" fontSize="10">110° Arc</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 280 200" className="blueprint-svg">
      <rect x="40" y="80" width="200" height="20" fill="none" stroke="#93c5fd" strokeWidth="2" />
      <rect x="50" y="100" width="180" height="70" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="40" y1="70" x2="240" y2="70" stroke="#f59e0b" strokeWidth="1" />
      <text x="120" y="64" fill="#f59e0b" fontSize="10">2400mm</text>
      <line x1="250" y1="80" x2="250" y2="170" stroke="#f59e0b" strokeWidth="1" />
      <text x="254" y="130" fill="#f59e0b" fontSize="10">860mm</text>
    </svg>
  );
};

const KitchenDetails = () => {
  const [activeId, setActiveId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const activeDetail = details.find((item) => item.id === activeId);

  return (
    <section className="kitchen-details">
      {/* HEADER */}
      <div className="kitchen-details__header">
        <div>
          <span className="kitchen-details__eyebrow">LOOK CLOSER</span>
          <h2>
            A kitchen is more
            <br />
            <span>than what you see.</span>
          </h2>
        </div>
        <p>
          Explore the small details that make a well-designed kitchen work better every day. Click any marker to view technical blueprints and dimensions.
        </p>
      </div>

      {/* MAIN IMAGE */}
      <div className="kitchen-details__visual">
        <img src={kitchenImage} alt="Premium modular kitchen" />
        <div className="kitchen-details__shade" />

        {/* HOTSPOTS */}
        {details.map((detail) => (
          <button
            key={detail.id}
            type="button"
            className={`kitchen-details__hotspot ${activeId === detail.id ? "is-active" : ""}`}
            style={{
              top: detail.position.top,
              left: detail.position.left,
            }}
            onClick={() => setActiveId(detail.id)}
            aria-label={`Explore ${detail.title}`}
          >
            <span className="kitchen-details__pulse" />
            <span className="kitchen-details__plus">
              <Plus size={15} strokeWidth={1.5} />
            </span>
          </button>
        ))}

        {/* DETAIL CARD */}
        <div className="kitchen-details__card">
          <div className="kitchen-details__card-top">
            <span>{activeDetail.number}</span>
            <span>EXPLORE DETAIL</span>
          </div>

          <h3>{activeDetail.title}</h3>
          <p>{activeDetail.description}</p>

          <div className="kitchen-details__card-actions">
            <button
              type="button"
              className="kitchen-details__btn-blueprint"
              onClick={() => setIsModalOpen(true)}
            >
              <Ruler size={15} />
              View Blueprint & Specs
            </button>
            <button
              type="button"
              className="kitchen-details__btn-link"
              onClick={() => navigate("/materials")}
            >
              Materials <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="kitchen-details__navigation">
        {details.map((detail) => (
          <button
            key={detail.id}
            type="button"
            className={activeId === detail.id ? "is-active" : ""}
            onClick={() => setActiveId(detail.id)}
          >
            <span>{detail.number}</span>
            <strong>{detail.title}</strong>
          </button>
        ))}
      </div>

      {/* BLUEPRINT / TECHNICAL SPEC MODAL */}
      {isModalOpen && (
        <div className="kitchen-modal__backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="kitchen-modal__content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="kitchen-modal__close" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="kitchen-modal__header">
              <div>
                <span className="kitchen-modal__tag">TECHNICAL SPECIFICATION // {activeDetail.number}</span>
                <h2>{activeDetail.title}</h2>
                <span className="kitchen-modal__subtitle">{activeDetail.subtitle}</span>
              </div>
            </div>

            <div className="kitchen-modal__body">
              {/* Blueprint Schematic Section */}
              <div className="kitchen-modal__blueprint-view">
                <div className="kitchen-modal__blueprint-grid">
                  <span className="blueprint-label">SCHEMATIC ELEVATION VIEW</span>
                  <BlueprintDiagram type={activeDetail.blueprintType} />
                  <span className="blueprint-scale">Scale: 1:20 Metric (CAD Verified)</span>
                </div>
              </div>

              {/* Specs Table & Details */}
              <div className="kitchen-modal__specs-view">
                <h3>
                  <Layers size={18} /> Dimension & Component Breakdown
                </h3>
                <div className="kitchen-modal__specs-grid">
                  {Object.entries(activeDetail.specs).map(([key, val]) => (
                    <div className="kitchen-modal__spec-row" key={key}>
                      <span className="spec-name">
                        <CheckCircle2 size={13} className="spec-icon" />
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </span>
                      <strong className="spec-value">{val}</strong>
                    </div>
                  ))}
                </div>

                <div className="kitchen-modal__notes">
                  <p><strong>Note:</strong> Customized sizing and modular configurations are engineered according to site measurements during architectural planning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default KitchenDetails;