import React, { useRef, useState } from "react";
import "./AIKitchenSuggestion.css";

import img1 from "../../images/material/acrylicc.jpg";
import img2 from "../../images/material/mattee.jpg";
import img3 from "../../images/material/veneer.jpg";
import img4 from "../../images/material/PUFinishh.jpg";
import img5 from "../../images/material/high.jpg";
import img6 from "../../images/material/membrane.jpg";

const aiMaterialOptions = [
  {
    name: "Acrylic",
    category: "Surface Finish",
    description:
      "High-gloss, modern and easy to maintain.",
    image: img1,
    variants: [
      {
        quality: "Standard",
        finish: "High Gloss",
        pricePerSqFt: 850,
        durability: "Good",
      },
      {
        quality: "Premium",
        finish: "High Gloss",
        pricePerSqFt: 1200,
        durability: "Very Good",
      },
      {
        quality: "Luxury",
        finish: "Ultra Gloss",
        pricePerSqFt: 1650,
        durability: "Excellent",
      },
    ],
  },

  {
    name: "Matte Laminate",
    category: "Surface Finish",
    description:
      "Soft, elegant finish with a contemporary feel.",
    image: img2,
    variants: [
      {
        quality: "Standard",
        finish: "Matte",
        pricePerSqFt: 500,
        durability: "Good",
      },
      {
        quality: "Premium",
        finish: "Super Matte",
        pricePerSqFt: 750,
        durability: "Very Good",
      },
      {
        quality: "Luxury",
        finish: "Anti-Fingerprint Matte",
        pricePerSqFt: 1050,
        durability: "Excellent",
      },
    ],
  },

  {
    name: "Natural Veneer",
    category: "Wood Finish",
    description:
      "Authentic wood character with a warm natural feel.",
    image: img3,
    variants: [
      {
        quality: "Standard",
        finish: "Natural Wood",
        pricePerSqFt: 900,
        durability: "Good",
      },
      {
        quality: "Premium",
        finish: "Premium Wood",
        pricePerSqFt: 1350,
        durability: "Very Good",
      },
      {
        quality: "Luxury",
        finish: "Select Wood Veneer",
        pricePerSqFt: 1900,
        durability: "Excellent",
      },
    ],
  },

  {
    name: "PU Finish",
    category: "Painted Finish",
    description:
      "Smooth painted finish for a refined premium look.",
    image: img4,
    variants: [
      {
        quality: "Standard",
        finish: "Matt PU",
        pricePerSqFt: 1000,
        durability: "Good",
      },
      {
        quality: "Premium",
        finish: "Satin PU",
        pricePerSqFt: 1450,
        durability: "Very Good",
      },
      {
        quality: "Luxury",
        finish: "High Gloss PU",
        pricePerSqFt: 1900,
        durability: "Excellent",
      },
    ],
  },

  {
    name: "High Gloss Laminate",
    category: "Surface Finish",
    description:
      "Reflective laminate finish suitable for contemporary kitchens.",
    image: img5,
    variants: [
      {
        quality: "Standard",
        finish: "Gloss",
        pricePerSqFt: 600,
        durability: "Good",
      },
      {
        quality: "Premium",
        finish: "High Gloss",
        pricePerSqFt: 850,
        durability: "Very Good",
      },
      {
        quality: "Luxury",
        finish: "Premium Gloss",
        pricePerSqFt: 1100,
        durability: "Excellent",
      },
    ],
  },

  {
    name: "Membrane",
    category: "Surface Finish",
    description:
      "Seamless finish with versatile colour options.",
    image: img6,
    variants: [
      {
        quality: "Standard",
        finish: "Matte",
        pricePerSqFt: 550,
        durability: "Good",
      },
      {
        quality: "Premium",
        finish: "Textured",
        pricePerSqFt: 750,
        durability: "Very Good",
      },
      {
        quality: "Luxury",
        finish: "Designer Texture",
        pricePerSqFt: 950,
        durability: "Excellent",
      },
    ],
  },
];

function AIKitchenSuggestion() {
  const fileInputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);

  const [selectedMaterial, setSelectedMaterial] =
    useState(null);

  const [selectedQuality, setSelectedQuality] =
    useState(null);

  const [uploadedImage, setUploadedImage] =
    useState(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysis, setAnalysis] =
    useState(null);

  const [selectedPoint, setSelectedPoint] =
    useState(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  // =========================================
  // MATERIAL SELECTION
  // =========================================

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    setSelectedQuality(null);
    setErrorMessage("");
  };

  // =========================================
  // QUALITY SELECTION
  // =========================================

  const handleQualitySelect = (variant) => {
    setSelectedQuality(variant);
    setErrorMessage("");
  };

  // =========================================
  // IMAGE PROCESSING
  // =========================================

  const processImage = (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        "Please upload a JPG, PNG or WEBP image."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        "Please upload an image smaller than 10MB."
      );
      return;
    }

    if (uploadedImage?.url) {
      URL.revokeObjectURL(uploadedImage.url);
    }

    const imageUrl =
      URL.createObjectURL(file);

    setUploadedImage({
      file,
      url: imageUrl,
      name: file.name,
    });

    setAnalysis(null);
    setSelectedPoint(null);
    setErrorMessage("");
  };

  // =========================================
  // FILE INPUT
  // =========================================

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0];

    if (file) {
      processImage(file);
    }
  };

  // =========================================
  // DRAG & DROP
  // =========================================

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      processImage(file);
    }
  };

  // =========================================
  // REMOVE IMAGE
  // =========================================

  const removeImage = () => {
    if (uploadedImage?.url) {
      URL.revokeObjectURL(
        uploadedImage.url
      );
    }

    setUploadedImage(null);
    setAnalysis(null);
    setSelectedPoint(null);
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================
  // STEP 1 → STEP 2
  // =========================================

  const handleNextFromMaterials = () => {
    if (
      !selectedMaterial ||
      !selectedQuality
    ) {
      return;
    }

    setErrorMessage("");
    setCurrentStep(2);
  };

  // =========================================
  // AI ANALYSIS
  // =========================================

  const handleAnalyze = async () => {
    if (
      !uploadedImage ||
      !selectedMaterial ||
      !selectedQuality
    ) {
      return;
    }

    setCurrentStep(3);
    setIsAnalyzing(true);

    setAnalysis(null);
    setSelectedPoint(null);
    setErrorMessage("");

    try {
      const formData = new FormData();

      formData.append(
        "image",
        uploadedImage.file
      );

      formData.append(
        "material",
        selectedMaterial.name
      );

      formData.append(
        "quality",
        selectedQuality.quality
      );

      const response = await fetch(
        "http://localhost:5001/api/ai-kitchen/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      console.log(
        "AI Kitchen Analysis:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Kitchen analysis failed."
        );
      }

      // New backend response:
      // data.analysis
      //
      // analysis contains:
      // summary
      // style
      // layout
      // space
      // lighting
      // storage
      // overallScore
      // points
      // recommendation
      // improvements

      setAnalysis(
        data.analysis
      );

    } catch (error) {
      console.error(
        "Kitchen AI error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Something went wrong while analyzing your kitchen."
      );

      setCurrentStep(2);

    } finally {
      setIsAnalyzing(false);
    }
  };

  // =========================================
  // SELECT MARKER
  // =========================================

  const handlePointClick = (point) => {
    setSelectedPoint(point);
  };

  // =========================================
  // RESET
  // =========================================

  const resetAI = () => {
    removeImage();

    setSelectedMaterial(null);
    setSelectedQuality(null);
    setAnalysis(null);
    setSelectedPoint(null);
    setIsAnalyzing(false);
    setErrorMessage("");
    setCurrentStep(1);
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <section className="ai-kitchen-section">
      <div className="ai-kitchen-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="ai-kitchen-header">

          <div className="ai-kitchen-eyebrow">
            <span className="ai-kitchen-dot"></span>
            AI KITCHEN DESIGNER
          </div>

          <h2>
            Your kitchen.
            <br />
            <span>
              Designed intelligently.
            </span>
          </h2>

          <p>
            Tell us what you like, show us your
            space, and let AI identify opportunities
            to improve your kitchen.
          </p>

        </div>

        {/* =====================================
            MAIN CARD
        ===================================== */}

        <div className="ai-kitchen-card">

          {/* ===================================
              STEPS
          =================================== */}

          <div className="ai-kitchen-steps">

            <div
              className={`ai-kitchen-step ${
                currentStep >= 1
                  ? "active"
                  : ""
              }`}
            >

              <div className="ai-step-number">
                01
              </div>

              <div className="ai-step-copy">
                <span>
                  Preference
                </span>

                <small>
                  Choose your finish
                </small>
              </div>

            </div>

            <div className="ai-step-line"></div>

            <div
              className={`ai-kitchen-step ${
                currentStep >= 2
                  ? "active"
                  : ""
              }`}
            >

              <div className="ai-step-number">
                02
              </div>

              <div className="ai-step-copy">
                <span>
                  Your space
                </span>

                <small>
                  Upload your kitchen
                </small>
              </div>

            </div>

            <div className="ai-step-line"></div>

            <div
              className={`ai-kitchen-step ${
                currentStep >= 3
                  ? "active"
                  : ""
              }`}
            >

              <div className="ai-step-number">
                03
              </div>

              <div className="ai-step-copy">
                <span>
                  AI vision
                </span>

                <small>
                  Discover opportunities
                </small>
              </div>

            </div>

          </div>

          {/* =====================================
              ERROR
          ===================================== */}

          {errorMessage && (
            <div className="ai-error-message">

              <span>!</span>

              {errorMessage}

            </div>
          )}

          {/* =====================================
              STEP 01
          ===================================== */}

          {currentStep === 1 && (

            <div className="ai-kitchen-content">

              <div className="ai-content-heading">

                <span>
                  STEP 01
                </span>

                <h3>
                  What kind of finish
                  <br />
                  speaks to you?
                </h3>

                <p>
                  Choose a material first. We'll
                  use your preference when
                  understanding your kitchen.
                </p>

              </div>

              {/* MATERIALS */}

              <div className="ai-material-grid">

                {aiMaterialOptions.map(
                  (material) => (

                    <button
                      type="button"
                      key={material.name}
                      className={`ai-material-card ${
                        selectedMaterial?.name ===
                        material.name
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleMaterialSelect(
                          material
                        )
                      }
                    >

                      <div className="ai-material-image">

                        <img
                          src={
                            material.image
                          }
                          alt={
                            material.name
                          }
                        />

                        <div className="ai-material-check">
                          ✓
                        </div>

                      </div>

                      <div className="ai-material-info">

                        <span>
                          {
                            material.category
                          }
                        </span>

                        <h4>
                          {material.name}
                        </h4>

                        <p>
                          {
                            material.description
                          }
                        </p>

                      </div>

                    </button>

                  )
                )}

              </div>

              {/* QUALITY */}

              {selectedMaterial && (

                <div className="ai-quality-area">

                  <div className="ai-quality-heading">

                    <div>

                      <span>
                        SELECT QUALITY
                      </span>

                      <h4>
                        {
                          selectedMaterial.name
                        }
                      </h4>

                    </div>

                  </div>

                  <div className="ai-quality-grid">

                    {selectedMaterial.variants.map(
                      (variant) => (

                        <button
                          type="button"
                          key={
                            variant.quality
                          }
                          className={`ai-quality-card ${
                            selectedQuality?.quality ===
                            variant.quality
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleQualitySelect(
                              variant
                            )
                          }
                        >

                          <div className="ai-quality-top">

                            <span>
                              {
                                variant.quality
                              }
                            </span>

                            <div className="ai-quality-radio">

                              {selectedQuality?.quality ===
                              variant.quality
                                ? "✓"
                                : ""}

                            </div>

                          </div>

                          <strong>
                            {
                              variant.finish
                            }
                          </strong>

                          <div className="ai-quality-details">

                            <span>
                              ₹
                              {variant.pricePerSqFt.toLocaleString(
                                "en-IN"
                              )}
                              /sq.ft
                            </span>

                            <span>
                              {
                                variant.durability
                              }
                            </span>

                          </div>

                        </button>

                      )
                    )}

                  </div>

                  <button
                    type="button"
                    className="ai-primary-button ai-continue-button"
                    disabled={
                      !selectedQuality
                    }
                    onClick={
                      handleNextFromMaterials
                    }
                  >

                    Continue to your kitchen

                    <span>
                      →
                    </span>

                  </button>

                </div>
              )}

            </div>
          )}

          {/* =====================================
              STEP 02
          ===================================== */}

          {currentStep === 2 && (

            <div className="ai-kitchen-content">

              <div className="ai-content-heading">

                <span>
                  STEP 02
                </span>

                <h3>
                  Now show us
                  <br />
                  your kitchen.
                </h3>

                <p>
                  Upload a clear photo of your
                  existing kitchen. Our AI will
                  identify areas where your kitchen
                  can be improved.
                </p>

              </div>

              {/* UPLOAD */}

              {!uploadedImage ? (

                <div
                  className={`ai-upload-box ${
                    isDragging
                      ? "dragging"
                      : ""
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() =>
                    setIsDragging(false)
                  }
                  onDrop={handleDrop}
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleFileChange
                    }
                    hidden
                  />

                  <div className="ai-upload-icon">
                    ↑
                  </div>

                  <h4>
                    Drop your kitchen photo here
                  </h4>

                  <p>
                    or click to browse from your
                    device
                  </p>

                  <span>
                    JPG, PNG or WEBP · Maximum 10MB
                  </span>

                </div>

              ) : (

                <div className="ai-upload-preview">

                  <img
                    src={
                      uploadedImage.url
                    }
                    alt="Uploaded kitchen"
                  />

                  <div className="ai-preview-overlay">

                    <div>

                      <span>
                        YOUR KITCHEN
                      </span>

                      <strong>
                        {
                          uploadedImage.name
                        }
                      </strong>

                    </div>

                    <button
                      type="button"
                      onClick={
                        removeImage
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>
              )}

              {/* ACTIONS */}

              <div className="ai-upload-actions">

                <button
                  type="button"
                  className="ai-back-button"
                  onClick={() =>
                    setCurrentStep(1)
                  }
                >
                  ← Back
                </button>

                <button
                  type="button"
                  className="ai-primary-button"
                  disabled={
                    !uploadedImage
                  }
                  onClick={
                    handleAnalyze
                  }
                >
                  Analyze my kitchen
                  <span>
                    ✦
                  </span>
                </button>

              </div>

            </div>
          )}

          {/* =====================================
              STEP 03
          ===================================== */}

          {currentStep === 3 && (

            <div className="ai-kitchen-result">

              {/* =================================
                  ANALYZING
              ================================= */}

              {isAnalyzing ? (

                <div className="ai-analyzing">

                  <div className="ai-scanner">

                    <div className="ai-scan-line"></div>

                    {uploadedImage && (
                      <img
                        src={
                          uploadedImage.url
                        }
                        alt="Analyzing kitchen"
                      />
                    )}

                    <div className="ai-scan-corner top-left"></div>

                    <div className="ai-scan-corner top-right"></div>

                    <div className="ai-scan-corner bottom-left"></div>

                    <div className="ai-scan-corner bottom-right"></div>

                  </div>

                  <div className="ai-analyzing-copy">

                    <span>
                      AI KITCHEN VISION
                    </span>

                    <h3>
                      Understanding your kitchen...
                    </h3>

                    <p>
                      We're studying the visible
                      layout, storage, lighting,
                      workflow and design opportunities.
                    </p>

                  </div>

                  <div className="ai-analysis-status">

                    <div>
                      <span className="status-active"></span>
                      Reading space
                    </div>

                    <div>
                      <span className="status-active"></span>
                      Detecting layout
                    </div>

                    <div>
                      <span className="status-active"></span>
                      Finding opportunities
                    </div>

                  </div>

                </div>

              ) : (

                /* =================================
                   AI RESULT
                ================================= */

                analysis && (

                  <div className="ai-vision-result">

                    {/* =================================
                        RESULT HEADER
                    ================================= */}

                    <div className="ai-vision-header">

                      <div>

                        <span>
                          AI KITCHEN VISION
                        </span>

                        <h3>
                          We found opportunities
                          <br />
                          in your kitchen.
                        </h3>

                        <p>
                          Tap a point on your kitchen
                          to explore the recommendation.
                        </p>

                      </div>

                      <div className="ai-score">

                        <span>
                          KITCHEN SCORE
                        </span>

                        <strong>
                          {
                            analysis.overallScore ||
                            "—"
                          }
                        </strong>

                        <small>
                          / 100
                        </small>

                      </div>

                    </div>

                    {/* =================================
                        KITCHEN IMAGE
                    ================================= */}

                    <div className="ai-vision-image-wrapper">

                      <img
                        src={
                          uploadedImage.url
                        }
                        alt="AI analyzed kitchen"
                        className="ai-vision-image"
                      />

                      {/* MARKERS */}

                      <div className="ai-vision-overlay">

                        {analysis.points?.map(
                          (point) => (

                            <button
                              type="button"
                              key={
                                point.id
                              }
                              className={`ai-vision-marker ${
                                selectedPoint?.id ===
                                point.id
                                  ? "active"
                                  : ""
                              }`}
                              style={{
                                left: `${point.x}%`,
                                top: `${point.y}%`,
                              }}
                              onClick={() =>
                                handlePointClick(
                                  point
                                )
                              }
                              aria-label={
                                point.title
                              }
                            >

                              <span className="ai-marker-number">
                                {String(
                                  point.id
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              <span className="ai-marker-pulse"></span>

                            </button>

                          )
                        )}

                      </div>

                      {/* IMAGE LABEL */}

                      <div className="ai-vision-image-label">

                        <span className="ai-live-dot"></span>

                        AI ANALYZED

                      </div>

                      {/* =================================
                          SELECTED POINT
                      ================================= */}

                      {selectedPoint && (

                        <div className="ai-point-card">

                          <button
                            type="button"
                            className="ai-point-close"
                            onClick={() =>
                              setSelectedPoint(
                                null
                              )
                            }
                          >
                            ×
                          </button>

                          <span className="ai-point-number">

                            {String(
                              selectedPoint.id
                            ).padStart(
                              2,
                              "0"
                            )}

                          </span>

                          <span className="ai-point-category">

                            {
                              selectedPoint.category
                            }

                          </span>

                          <h4>
                            {
                              selectedPoint.title
                            }
                          </h4>

                          <p>
                            {
                              selectedPoint.suggestion
                            }
                          </p>

                          <div
                            className={`ai-point-priority priority-${(
                              selectedPoint.priority ||
                              "medium"
                            ).toLowerCase()}`}
                          >
                            {
                              selectedPoint.priority ||
                              "Medium"
                            }{" "}
                            priority
                          </div>

                        </div>
                      )}

                    </div>

                    {/* =================================
                        OPPORTUNITIES
                    ================================= */}

                    <div className="ai-opportunity-section">

                      <div className="ai-section-mini-heading">

                        <span>
                          DESIGN OPPORTUNITIES
                        </span>

                        <small>
                          {
                            analysis.points
                              ?.length || 0
                          }{" "}
                          areas identified
                        </small>

                      </div>

                      <div className="ai-opportunity-grid">

                        {analysis.points?.map(
                          (point) => (

                            <button
                              type="button"
                              key={
                                point.id
                              }
                              className={`ai-opportunity-card ${
                                selectedPoint?.id ===
                                point.id
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handlePointClick(
                                  point
                                )
                              }
                            >

                              <div className="ai-opportunity-number">

                                {String(
                                  point.id
                                ).padStart(
                                  2,
                                  "0"
                                )}

                              </div>

                              <div className="ai-opportunity-copy">

                                <span>
                                  {
                                    point.category
                                  }
                                </span>

                                <strong>
                                  {
                                    point.title
                                  }
                                </strong>

                                <p>
                                  {
                                    point.suggestion
                                  }
                                </p>

                              </div>

                              <div className="ai-opportunity-arrow">
                                →
                              </div>

                            </button>

                          )
                        )}

                      </div>

                    </div>

                    {/* =================================
                        KITCHEN OVERVIEW
                    ================================= */}

                    <div className="ai-kitchen-overview">

                      <div className="ai-overview-heading">

                        <span>
                          YOUR KITCHEN AT A GLANCE
                        </span>

                        <h4>
                          {
                            analysis.summary
                          }
                        </h4>

                      </div>

                      <div className="ai-recommendation-grid">

                        <div>
                          <span>
                            STYLE
                          </span>

                          <strong>
                            {
                              analysis.style ||
                              "—"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            LAYOUT
                          </span>

                          <strong>
                            {
                              analysis.layout ||
                              "—"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            SPACE
                          </span>

                          <strong>
                            {
                              analysis.space ||
                              "—"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            LIGHTING
                          </span>

                          <strong>
                            {
                              analysis.lighting ||
                              "—"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            STORAGE
                          </span>

                          <strong>
                            {
                              analysis.storage ||
                              "—"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            FINISH
                          </span>

                          <strong>
                            {
                              analysis
                                .recommendation
                                ?.finish ||
                              selectedQuality?.finish ||
                              "—"
                            }
                          </strong>
                        </div>

                      </div>

                    </div>

                    {/* =================================
                        AI RECOMMENDED DIRECTION
                    ================================= */}

                    {analysis.recommendation && (

                      <div className="ai-final-recommendation">

                        <div className="ai-section-mini-heading">

                          <span>
                            AI RECOMMENDED DIRECTION
                          </span>

                        </div>

                        <div className="ai-recommendation-grid">

                          <div>
                            <span>
                              STYLE
                            </span>

                            <strong>
                              {
                                analysis
                                  .recommendation
                                  .style
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              LAYOUT
                            </span>

                            <strong>
                              {
                                analysis
                                  .recommendation
                                  .layout
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              COLOUR
                            </span>

                            <strong>
                              {
                                analysis
                                  .recommendation
                                  .color
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              COUNTERTOP
                            </span>

                            <strong>
                              {
                                analysis
                                  .recommendation
                                  .countertop
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              STORAGE
                            </span>

                            <strong>
                              {
                                analysis
                                  .recommendation
                                  .storage
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              LIGHTING
                            </span>

                            <strong>
                              {
                                analysis
                                  .recommendation
                                  .lighting
                              }
                            </strong>
                          </div>

                        </div>

                      </div>
                    )}

                    {/* =================================
                        DESIGN INSIGHTS
                    ================================= */}

                    {analysis.improvements?.length >
                      0 && (

                      <div className="ai-improvements">

                        <span>
                          AI DESIGN INSIGHTS
                        </span>

                        <ul>

                          {analysis.improvements.map(
                            (
                              item,
                              index
                            ) => (

                              <li
                                key={index}
                              >

                                <span>
                                  +
                                </span>

                                <p>
                                  {item}
                                </p>

                              </li>

                            )
                          )}

                        </ul>

                      </div>
                    )}

                    {/* =================================
                        SELECTED MATERIAL
                    ================================= */}

                    <div className="ai-selected-material">

                      <div className="ai-selected-material-image">

                        <img
                          src={
                            selectedMaterial?.image
                          }
                          alt={
                            selectedMaterial?.name ||
                            "Selected material"
                          }
                        />

                      </div>

                      <div className="ai-selected-material-copy">

                        <span>
                          YOUR SELECTED FINISH
                        </span>

                        <strong>
                          {
                            selectedMaterial?.name
                          }
                        </strong>

                        <small>
                          {
                            selectedQuality?.quality
                          }
                          {" · "}
                          {
                            selectedQuality?.finish
                          }
                        </small>

                      </div>

                    </div>

                    {/* =================================
                        ACTIONS
                    ================================= */}

                    <div className="ai-result-actions">

                      <button
                        type="button"
                        className="ai-primary-button"
                      >
                        Explore this kitchen
                        <span>
                          →
                        </span>
                      </button>

                      <button
                        type="button"
                        className="ai-text-button"
                        onClick={resetAI}
                      >
                        Start again
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="ai-kitchen-footer">

          <span>
            ✦
          </span>

          <p>
            AI suggestions are based on your
            selected preferences and uploaded
            kitchen image. Final recommendations
            can be refined with our design team.
          </p>

        </div>

      </div>
    </section>
  );
}

export default AIKitchenSuggestion;