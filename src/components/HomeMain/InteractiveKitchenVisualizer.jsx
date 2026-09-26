// InteractiveKitchenVisualizer.jsx

import React, { useState } from "react";
import "./InteractiveKitchenVisualizer.css";
import {
  Upload,
  Camera,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import img from "../../images/home/home.png";

const InteractiveKitchenVisualizer = () => {
  const [selectedStyle, setSelectedStyle] = useState("Modern");
  const [selectedColor, setSelectedColor] = useState("Wood");
  const [selectedFinish, setSelectedFinish] = useState("Matte");
  const [selectedBudget, setSelectedBudget] = useState("₹4–6L");

  const styles = [
    "Modern",
    "Minimal",
    "Contemporary",
    "Luxury",
    "Scandinavian",
    "Classic",
  ];

  const colors = [
    { name: "White", color: "#f6f6f4" },
    { name: "Wood", color: "#9b7753" },
    { name: "Grey", color: "#8c8c86" },
    { name: "Black", color: "#2d2d2d" },
    { name: "Custom", color: "#d5c9b8" },
  ];

  const finishes = ["Matte", "Gloss", "Acrylic", "Laminate"];
  const budgets = ["₹2–4L", "₹4–6L", "₹6–10L", "₹10L+"];

  return (
  <section className="ikv-section">
    <div className="ikv-container">

      {/* LEFT / HERO CONTENT */}
      <div className="ikv-heading">
        <div className="ikv-label">
          <span></span>
          INTERACTIVE TOOL
        </div>

        <h2>
          Interactive
          <br />
          Kitchen Visualizer
        </h2>

        <p>
          Upload your space, choose your style,
          <br />
          and see your dream kitchen come to life.
        </p>
      </div>

      {/* LARGE KITCHEN VISUAL */}
      <div className="ikv-visual">
        <img src={img} alt="Modern kitchen" />
        <div className="ikv-image-fade"></div>
      </div>

      {/* UPLOAD PANEL */}
      <div className="ikv-panel upload-panel">

        <div className="panel-heading">
          <span>1</span>
          <strong>Upload Your Kitchen Photo</strong>
        </div>

        <div className="upload-box">

          <Upload size={42} strokeWidth={1.5} />

          <h4>Drop your kitchen photo here</h4>

          <span className="upload-or">or</span>

          <div className="upload-actions">

            <button>
              <Upload size={16} />
              Upload Photo
            </button>

            <button>
              <Camera size={16} />
              Take a Photo
            </button>

            <button>
              <ImageIcon size={16} />
              Use Sample
            </button>

          </div>

        </div>

      </div>

      {/* PREFERENCE PANEL */}
      <div className="ikv-panel preference-panel">

        <div className="panel-heading">
          <span>2</span>
          <strong>Tell us your preferences</strong>
        </div>

        {/* STYLE */}
        <div className="pref-row">

          <label>Kitchen Style</label>

          <div className="pill-wrap">

            {styles.map((item) => (
              <button
                key={item}
                className={
                  selectedStyle === item
                    ? "pill active"
                    : "pill"
                }
                onClick={() => setSelectedStyle(item)}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* COLOR */}
        <div className="pref-row">

          <label>Color</label>

          <div className="color-wrap">

            {colors.map((item) => (
              <button
                key={item.name}
                className={
                  selectedColor === item.name
                    ? "color-circle active"
                    : "color-circle"
                }
                onClick={() => setSelectedColor(item.name)}
                style={{
                  background: item.color,
                }}
                aria-label={item.name}
              />

            ))}

          </div>

        </div>

        {/* FINISH */}
        <div className="pref-row">

          <label>Finish</label>

          <div className="pill-wrap">

            {finishes.map((item) => (
              <button
                key={item}
                className={
                  selectedFinish === item
                    ? "pill active"
                    : "pill"
                }
                onClick={() => setSelectedFinish(item)}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* BUDGET */}
        <div className="pref-row">

          <label>Budget</label>

          <div className="pill-wrap">

            {budgets.map((item) => (
              <button
                key={item}
                className={
                  selectedBudget === item
                    ? "pill active"
                    : "pill"
                }
                onClick={() => setSelectedBudget(item)}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        <button className="create-btn">
          Create My Kitchen
          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  </section>
);
};

export default InteractiveKitchenVisualizer;