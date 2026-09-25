import React, { useEffect, useRef, useState } from "react";
import "./KitchenProcess.css";

import consultationImg from "../../images/home/consultation.jpg";
import measurementImg from "../../images/home/measurement.jpg";
import designImg from "../../images/home/design.jpg";
import materialImg from "../../images/home/material.jpg";
import manufacturingImg from "../../images/home/manufacture.jpg";
import installationImg from "../../images/home/installation.jpg";
import handoverImg from "../../images/home/handover.jpg";

const KitchenProcess = () => {
  const sectionRef = useRef(null);
  const [visibleSteps, setVisibleSteps] = useState([]);

  const steps = [
    {
      number: "01",
      title: "Consultation",
      image: consultationImg,
    },
    {
      number: "02",
      title: "Site Measurement",
      image: measurementImg,
    },
    {
      number: "03",
      title: "3D Design",
      image: designImg,
    },
    {
      number: "04",
      title: "Material Selection",
      image: materialImg,
    },
    {
      number: "05",
      title: "Manufacturing",
      image: manufacturingImg,
    },
    {
      number: "06",
      title: "Installation",
      image: installationImg,
    },
    {
      number: "07",
      title: "Final Handover",
      image: handoverImg,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".kitchen-process-step"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);

            setVisibleSteps((prev) =>
              prev.includes(index)
                ? prev
                : [...prev, index]
            );
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const renderStep = (step, index) => (
    <div
      className={`kitchen-process-step ${
        visibleSteps.includes(index)
          ? "kitchen-process-step-visible"
          : ""
      }`}
      data-index={index}
      key={step.number}
    >
      <div className="kitchen-process-image">
        <img
          src={step.image}
          alt={step.title}
        />
      </div>

      <div className="kitchen-process-step-content">
        <span className="kitchen-process-number">
          {step.number}
        </span>

        <h3>{step.title}</h3>
      </div>
    </div>
  );

  return (
    <section
      className="kitchen-process-section"
      ref={sectionRef}
    >
      <div className="kitchen-process-wrapper">

        {/* LEFT INTRO */}
        <div className="kitchen-process-intro">

          <div className="kitchen-process-label">
            OUR PROCESS
          </div>

          <h2>
            From Empty
            <br />
            Space
            <br />
            to Finished
            <br />
            Kitchen
          </h2>

          <p>
            A simple journey from your first idea
            to the kitchen you imagined.
          </p>

          <button
            className="kitchen-process-arrow"
            aria-label="View process"
          >
            →
          </button>

        </div>

        {/* RIGHT PROCESS */}
        <div className="kitchen-process-steps">

          {/* TOP ROW */}
          <div className="kitchen-process-row kitchen-process-row-top">
            {steps
              .slice(0, 4)
              .map((step, index) =>
                renderStep(step, index)
              )}
          </div>

          {/* CONNECTING LINE */}
          <div className="kitchen-process-line">
            <span />
            <span />
          </div>

          {/* BOTTOM ROW */}
          <div className="kitchen-process-row kitchen-process-row-bottom">
            {steps
              .slice(4)
              .map((step, index) =>
                renderStep(step, index + 4)
              )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default KitchenProcess;