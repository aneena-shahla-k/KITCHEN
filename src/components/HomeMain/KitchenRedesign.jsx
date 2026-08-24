import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  ImagePlus,
  MessageCircle,
  X,
} from "lucide-react";

import "../../styles/HomeStyles/kitchenRedesign.css";

import kitchenImage from "../../images/modernn.jpg";

const KitchenRedesign = () => {
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setFileName(file.name);
  };

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = "919876543210"; // Replace with your WhatsApp number

    let message =
      "Hi, I would like to redesign my kitchen. I am sharing my kitchen photo for a design suggestion.";

    if (fileName) {
      message += `\n\nPhoto: ${fileName}`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="kitchen-redesign"
      id="redesign"
    >
      <div className="redesign-container">

        {/* =====================================================
            IMAGE SIDE
        ===================================================== */}

        <div className="redesign-visual">

          <img
            src={kitchenImage}
            alt="Kitchen interior"
          />

          <div className="redesign-visual-overlay" />

          <div className="redesign-image-label">
            <span>YOUR SPACE</span>
            <strong>CAN LOOK DIFFERENT.</strong>
          </div>

          <div className="redesign-floating-note">

            <span className="redesign-note-icon">
              <Camera size={14} />
            </span>

            <div>
              <strong>
                Start with your kitchen
              </strong>

              <span>
                A simple photo is enough.
              </span>
            </div>

          </div>

        </div>


        {/* =====================================================
            CONTENT SIDE
        ===================================================== */}

        <div className="redesign-content">

          <span className="redesign-label">
            KITCHEN REDESIGN
          </span>

          <h2>
            Have a kitchen
            <br />
            <span>you want to change?</span>
          </h2>

          <p className="redesign-intro">
            Send us a photo of your existing kitchen.
            Our design team will look at your space
            and help you explore a better modular
            kitchen design.
          </p>


          {/* =================================================
              STEPS
          ================================================= */}

          <div className="redesign-steps">

            <div className="redesign-step">

              <span className="step-number">
                01
              </span>

              <div>
                <strong>
                  Take a photo
                </strong>

                <p>
                  Capture your existing kitchen
                  from a clear angle.
                </p>
              </div>

            </div>


            <div className="redesign-step">

              <span className="step-number">
                02
              </span>

              <div>
                <strong>
                  Send it to us
                </strong>

                <p>
                  Share the photo with our team
                  through WhatsApp.
                </p>
              </div>

            </div>


            <div className="redesign-step">

              <span className="step-number">
                03
              </span>

              <div>
                <strong>
                  Discuss your ideas
                </strong>

                <p>
                  Tell us what you want to improve
                  or change.
                </p>
              </div>

            </div>

          </div>


          {/* =================================================
              PHOTO UPLOAD
          ================================================= */}

          <div className="redesign-upload">

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
                className="upload-box"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <span className="upload-icon">
                  <ImagePlus size={18} />
                </span>

                <span className="upload-text">

                  <strong>
                    Add your kitchen photo
                  </strong>

                  <small>
                    JPG, PNG or WEBP
                  </small>

                </span>

                <ArrowRight size={16} />

              </button>
            ) : (
              <div className="uploaded-box">

                <div className="uploaded-preview">

                  <img
                    src={image}
                    alt="Selected kitchen"
                  />

                </div>

                <div className="uploaded-info">

                  <span>
                    PHOTO SELECTED
                  </span>

                  <strong>
                    {fileName}
                  </strong>

                  <button
                    type="button"
                    onClick={removeImage}
                  >
                    <X size={13} />
                    Remove
                  </button>

                </div>

              </div>
            )}

          </div>


          {/* =================================================
              WHATSAPP BUTTON
          ================================================= */}

          <button
            type="button"
            className="redesign-whatsapp"
            onClick={openWhatsApp}
          >

            <span className="whatsapp-icon">
              <MessageCircle size={18} />
            </span>

            <span>
              {image
                ? "Send photo on WhatsApp"
                : "Send your kitchen on WhatsApp"}
            </span>

            <ArrowRight size={16} />

          </button>


          <div className="redesign-note">

            <Check size={13} />

            <span>
              No complicated forms. Just send us
              your kitchen photo and talk to our team.
            </span>

          </div>

        </div>

      </div>
    </section>
  );
};

export default KitchenRedesign;