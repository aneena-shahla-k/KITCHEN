import React, { useRef, useState } from "react";
import {
  ArrowUpRight,
  Camera,
  Check,
  MessageCircle,
  X
} from "lucide-react";
import "../../styles/HomeStyles/kitchenConsultation.css";

const KitchenConsultation = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    setImage(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const removeImage = () => {
    setImage(null);
    setFileName("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const sendToWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'd like to redesign my kitchen. I'm sharing my kitchen photo for a design consultation.`
    );

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="kitchen-consultation">

      <div className="consultation-inner">

        {/* LEFT VISUAL */}

        <div className="consultation-visual">

          <div className="visual-image" />

          <div className="visual-gradient" />

          <div className="visual-top">
            <span>KERALA KITCHEN STUDIO</span>

            <span>EST. 2026</span>
          </div>

          <div className="visual-bottom">

            <span className="visual-small">
              YOUR SPACE
            </span>

            <h3>
              From your home,
              <br />
              <em>to something beautiful.</em>
            </h3>

          </div>

          <div className="floating-leaf leaf-one" />
          <div className="floating-leaf leaf-two" />

        </div>


        {/* RIGHT CONTENT */}

        <div className="consultation-content">

          <div className="content-label">
            <span>01</span>
            <div />
            <span>PERSONAL DESIGN</span>
          </div>

          <h2>
            Let us see
            <br />
            <em>your kitchen.</em>
          </h2>

          <p className="consultation-description">
            Every kitchen has a story. Share a photo of
            your space with our design team and let us
            help you imagine what it could become.
          </p>


          {/* GLASS UPLOAD CARD */}

          <div className="upload-glass">

            {!image ? (

              <label
                className="upload-area"
                htmlFor="kitchen-photo"
              >

                <div className="upload-icon">
                  <Camera size={20} strokeWidth={1.4} />
                </div>

                <div className="upload-copy">

                  <strong>
                    Upload your kitchen
                  </strong>

                  <span>
                    JPG, PNG or WEBP
                  </span>

                </div>

                <div className="upload-arrow">
                  <ArrowUpRight size={16} />
                </div>

                <input
                  ref={inputRef}
                  id="kitchen-photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImage}
                />

              </label>

            ) : (

              <div className="selected-photo">

                <div className="photo-thumb">
                  <img
                    src={image}
                    alt="Selected kitchen"
                  />
                </div>

                <div className="photo-details">

                  <span>PHOTO SELECTED</span>

                  <strong>
                    {fileName}
                  </strong>

                  <small>
                    Ready to share with our team
                  </small>

                </div>

                <button
                  type="button"
                  className="remove-photo"
                  onClick={removeImage}
                  aria-label="Remove photo"
                >
                  <X size={14} />
                </button>

              </div>

            )}

          </div>


          {/* WHATSAPP CTA */}

          <button
            type="button"
            className={`whatsapp-cta ${
              image ? "ready" : ""
            }`}
            onClick={sendToWhatsApp}
          >

            <span className="whatsapp-icon">
              <MessageCircle size={17} />
            </span>

            <span className="whatsapp-text">

              <small>
                {image
                  ? "PHOTO READY"
                  : "CONTINUE WITH WHATSAPP"}
              </small>

              <strong>
                Share with our design team
              </strong>

            </span>

            <span className="whatsapp-arrow">
              <ArrowUpRight size={17} />
            </span>

          </button>


          {/* TRUST */}

          <div className="consultation-note">

            <div className="note-check">
              <Check size={11} />
            </div>

            <span>
              Our team will review your space and
              get back to you with design ideas.
            </span>

          </div>

        </div>

      </div>


      {/* BOTTOM LINE */}

      <div className="consultation-footer">

        <span>
          BUILT FOR REAL HOMES
        </span>

        <div />

        <span>
          KERALA • INDIA
        </span>

      </div>

    </section>
  );
};

export default KitchenConsultation;