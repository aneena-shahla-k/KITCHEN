import React, { useEffect, useRef, useState } from "react";
import {
  Ruler,
  PenTool,
  Hammer,
//   ArrowDown,
} from "lucide-react";
import "../../styles/HomeStyles/designProcess.css";

import discover from "../../images/classic.jpg";
import design from "../../images/wood.jpg";
import create from "../../images/luxury.jpg";

const steps = [
  {
    number: "01",
    label: "DISCOVER",
    title: "Understanding your space.",
    description:
      "We begin by understanding your home, your lifestyle, your storage needs and the way you want your kitchen to feel.",
    image: discover,
    icon: Ruler
  },
  {
    number: "02",
    label: "DESIGN",
    title: "Designed for your life.",
    description:
      "Our designers bring together thoughtful layouts, materials, colours and details to create a kitchen made around you.",
    image: design,
    icon: PenTool
  },
  {
    number: "03",
    label: "CREATE",
    title: "Built with precision.",
    description:
      "From carefully selected materials to installation and finishing, every detail is brought together with precision.",
    image: create,
    icon: Hammer
  }
];

const DesignProcess = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const progress =
        Math.min(
          Math.max(
            -rect.top /
              (sectionHeight - viewportHeight),
            0
          ),
          0.999
        );

      const index = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1
      );

      setActive(index);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true
    });

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const ActiveIcon = steps[active].icon;

  return (
    <section
      ref={sectionRef}
      className="design-process"
    >

      <div className="process-sticky">

        {/* HEADER */}

        <div className="process-header">
          <h2>
            From an idea <em> to your home.</em>
          </h2>
        </div>


        {/* MAIN */}

        <div className="process-main">

          {/* LEFT */}

          <div className="process-left">

            <div className="process-line">

              <div
                className="process-line-progress"
                style={{
                  height: `${(active / 2) * 100}%`
                }}
              />

            </div>


            <div className="process-steps">

              {steps.map((step, index) => {

                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className={`process-step ${
                      active === index
                        ? "active"
                        : ""
                    } ${
                      index < active
                        ? "completed"
                        : ""
                    }`}
                  >

                    <div className="step-marker">

                      {index < active ? (
                        <span>✓</span>
                      ) : (
                        <Icon size={15} />
                      )}

                    </div>


                    <div className="step-content">

                      <span className="step-number">
                        {step.number}
                      </span>

                      <span className="step-label">
                        {step.label}
                      </span>

                      <h3>
                        {step.title}
                      </h3>

                      <p>
                        {step.description}
                      </p>

                    </div>

                  </div>
                );

              })}

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="process-visual">

            {steps.map((step, index) => (
              <img
                key={step.number}
                src={step.image}
                alt={step.title}
                className={
                  active === index
                    ? "process-image active"
                    : "process-image"
                }
              />
            ))}


            <div className="visual-shade" />


            {/* GLASS CARD */}

            <div className="process-glass">

              <div className="glass-top">

                <span>
                  {steps[active].number}
                </span>

                <span>
                  {steps[active].label}
                </span>

              </div>

              <div className="glass-icon">
                <ActiveIcon size={18} />
              </div>

              <strong>
                {active === 0 &&
                  "Every home begins with understanding."}

                {active === 1 &&
                  "Every detail begins with intention."}

                {active === 2 &&
                  "Every detail deserves precision."}
              </strong>

            </div>


            {/* IMAGE COUNTER */}

            <div className="visual-counter">

              <span>
                0{active + 1}
              </span>

              <div className="counter-line" />

              <span>
                03
              </span>

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="process-bottom">

        <span className="process-location">
            DESIGNED IN KERALA
        </span>

        <a href="/contact" className="process-cta">
            Start your kitchen
            {/* <ArrowDown size={13} /> */}
        </a>

        </div>

      </div>

    </section>
  );
};

export default DesignProcess;