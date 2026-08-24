import React, { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./howWeWork.css";

import step1 from "../../images/modern.jpg";
import step2 from "../../images/minimal.jpg";
import step3 from "../../images/modernn.jpg";
import step4 from "../../images/luxury.jpg";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share your kitchen space, requirements, storage needs and the kind of kitchen you have in mind.",
    image: step1,
    points: [
      "Understand your requirements",
      "Check your available space",
      "Discuss your preferences",
    ],
  },
  {
    number: "02",
    title: "Plan your kitchen",
    description:
      "Our team works on the layout, storage, materials and overall planning based on your space.",
    image: step2,
    points: [
      "Choose the right layout",
      "Plan storage requirements",
      "Select materials and finishes",
    ],
  },
  {
    number: "03",
    title: "See your kitchen design",
    description:
      "Get a clear idea of how your finished kitchen can look before the work begins.",
    image: step3,
    points: [
      "Review the proposed design",
      "Make required changes",
      "Finalize the kitchen",
    ],
  },
  {
    number: "04",
    title: "We install your kitchen",
    description:
      "Once everything is finalized, our team takes care of the installation and final setup.",
    image: step4,
    points: [
      "Production begins",
      "Professional installation",
      "Final quality check",
    ],
  },
];

const HowWeWork = () => {
  const [active, setActive] = useState(0);

  const current = steps[active];

  const nextStep = () => {
    setActive((prev) => (prev + 1) % steps.length);
  };

  const previousStep = () => {
    setActive(
      (prev) => (prev - 1 + steps.length) % steps.length
    );
  };

  return (
    <section className="how-we-work">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="how-work-header">

        <div>

          <span className="how-work-label">
            HOW WE WORK
          </span>

          <h2>
            From your idea
            <br />
            <span>to your kitchen.</span>
          </h2>

        </div>

        <p>
          We keep the process simple and clear,
          from understanding your requirements
          to installing the finished kitchen.
        </p>

      </div>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="how-work-content">

        {/* IMAGE */}

        <div className="how-work-image">

          <img
            key={current.image}
            src={current.image}
            alt={current.title}
          />

          <div className="how-work-image-number">
            {current.number}
          </div>

          <div className="how-work-image-bottom">

            <span>
              STEP {current.number}
            </span>

            <strong>
              {current.title}
            </strong>

          </div>

        </div>


        {/* DETAILS */}

        <div className="how-work-details">

          <div className="how-work-step-count">

            <span>
              STEP
            </span>

            <strong>
              {current.number}
            </strong>

            <small>
              / 04
            </small>

          </div>


          <h3>
            {current.title}
          </h3>

          <p className="how-work-description">
            {current.description}
          </p>


          {/* POINTS */}

          <div className="how-work-points">

            {current.points.map((point, index) => (

              <div
                className="how-work-point"
                key={point}
              >

                <span>
                  {index + 1}
                </span>

                <p>
                  {point}
                </p>

              </div>

            ))}

          </div>


          {/* NAVIGATION */}

          <div className="how-work-navigation">

            <div className="how-work-arrows">

              <button
                type="button"
                onClick={previousStep}
                aria-label="Previous step"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={nextStep}
                aria-label="Next step"
              >
                <ChevronRight size={18} />
              </button>

            </div>


            <div className="how-work-progress">

              {steps.map((step, index) => (

                <button
                  key={step.number}
                  type="button"
                  className={
                    active === index
                      ? "active"
                      : ""
                  }
                  onClick={() => setActive(index)}
                  aria-label={`Go to step ${index + 1}`}
                >
                  <span />
                </button>

              ))}

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <div className="how-work-footer">

        <div>

          <span>
            READY TO START?
          </span>

          <strong>
            Let's plan your kitchen.
          </strong>

        </div>

        <a href="/contact">
          Get started
          <ArrowRight size={15} />
        </a>

      </div>

    </section>
  );
};

export default HowWeWork;