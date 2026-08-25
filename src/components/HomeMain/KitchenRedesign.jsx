import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  ImagePlus,
  MessageCircle,
  Sparkles,
  Send,
  X,
} from "lucide-react";

import "../../styles/HomeStyles/kitchenRedesign.css";
import kitchenImage from "../../images/redesign.PNG";

const KitchenRedesign = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setFileName(file.name);
  };

  const removeImage = () => {
    if (image) URL.revokeObjectURL(image);
    setImage(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openWhatsApp = () => {
    const phoneNumber = "919876543210"; // Replace with your actual WhatsApp number
    let message =
      "Hi KitchenCraft! I'd like to explore a redesign for my existing kitchen. Here is my current kitchen details.";

    if (fileName) {
      message += ` (Attached Photo: ${fileName})`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="kitchen-redesign" id="redesign">
      <div className="redesign-container">
        {/* =====================================================
            VISUAL SIDE (WITH BEFORE/AFTER CONTEXT)
        ===================================================== */}
        <div className="redesign-visual">
          <img src={kitchenImage} alt="Modern kitchen transformation" />
          <div className="redesign-visual-overlay" />

          {/* Transformation Highlight Badge */}
          <div className="transformation-badge">
            <span className="badge-pill">RENOVATION MADE SIMPLE</span>
            <div className="badge-text">
              <strong>Your Old Space</strong>
              <ArrowRight size={14} />
              <span>Stunning 3D Modular</span>
            </div>
          </div>

          {/* Floating Action Tip */}
          <div className="redesign-floating-note">
            <span className="redesign-note-icon">
              <Camera size={16} />
            </span>
            <div>
              <strong>Snap a quick photo</strong>
              <span>No measurements needed yet</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTENT SIDE
        ===================================================== */}
        <div className="redesign-content">
          <span className="redesign-label">KITCHEN MAKEOVER</span>

          <h2>
            Transform your
            <br />
            <span>existing kitchen.</span>
          </h2>

          <p className="redesign-intro">
            Tired of your current kitchen layout? Send us a picture from your
            phone and our design experts will show you how it can be upgraded.
          </p>

          {/* 3-STEP PROCESS CARDS */}
          <div className="redesign-steps-grid">
            <div className="step-card">
              <div className="step-card-header">
                <span className="step-icon-wrap">
                  <Camera size={15} />
                </span>
                <span className="step-tag">Step 01</span>
              </div>
              <strong>Take a Photo</strong>
              <p>Capture a wide angle of your existing kitchen space.</p>
            </div>

            <div className="step-card">
              <div className="step-card-header">
                <span className="step-icon-wrap">
                  <Send size={15} />
                </span>
                <span className="step-tag">Step 02</span>
              </div>
              <strong>Send on WhatsApp</strong>
              <p>Share it directly with our team in one tap.</p>
            </div>

            <div className="step-card">
              <div className="step-card-header">
                <span className="step-icon-wrap">
                  <Sparkles size={15} />
                </span>
                <span className="step-tag">Step 03</span>
              </div>
              <strong>Get Free 3D Plan</strong>
              <p>Receive custom layout ideas and estimate breakdown.</p>
            </div>
          </div>

          {/* PHOTO UPLOAD & ACTIONS */}
          <div className="redesign-actions">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />

            {!image ? (
              <button
                type="button"
                className="upload-trigger-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-btn-left">
                  <ImagePlus size={16} />
                  <span>Attach Kitchen Photo </span>
                </div>
                <span className="browse-pill">Browse</span>
              </button>
            ) : (
              <div className="uploaded-preview-bar">
                <img src={image} alt="Selected preview" />
                <div className="preview-meta">
                  <span>READY TO SHARE</span>
                  <strong>{fileName}</strong>
                </div>
                <button
                  type="button"
                  className="preview-remove"
                  onClick={removeImage}
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* PRIMARY WHATSAPP CTA */}
            <button
              type="button"
              className="redesign-whatsapp-primary"
              onClick={openWhatsApp}
            >
              <div className="wa-btn-content">
                <MessageCircle size={18} />
                <span>
                  {image
                    ? "Send Attached Photo on WhatsApp"
                    : "Send Kitchen Photo on WhatsApp"}
                </span>
              </div>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="redesign-trust-note">
            <Check size={14} />
            <span>
              100% Free consultation • Fast response within 2 hours • No spam
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenRedesign;