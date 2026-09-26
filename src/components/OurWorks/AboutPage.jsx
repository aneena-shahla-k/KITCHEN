import React, { useState } from "react";
import {
  ArrowRight,
  Diamond,
  Ruler,
  Users,
  ShieldCheck,
} from "lucide-react";
import "./AboutPage.css";
import img from "../../images/about/about-hero.png";
import img1 from "../../images/about/kitchen1.jpg";

const projects = [
  {
    title: "Modern Minimal Kitchen",
    category: "MODERN",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Walnut Elegance",
    category: "LUXURY",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Bright & Airy",
    category: "MINIMAL",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Urban Chic",
    category: "MODERN",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Timeless Classic",
    category: "CLASSIC",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Contemporary Luxury",
    category: "LUXURY",
    image:
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=85",
  },
];

const features = [
  {
    icon: Diamond,
    title: "PREMIUM",
    subtitle: "QUALITY",
    description: "Only the finest materials.",
  },
  {
    icon: Ruler,
    title: "CUSTOM",
    subtitle: "SOLUTIONS",
    description: "Designed for your space.",
  },
  {
    icon: Users,
    title: "EXPERIENCED",
    subtitle: "TEAM",
    description: "Designers & craftsmen.",
  },
  {
    icon: ShieldCheck,
    title: "ON-TIME",
    subtitle: "DELIVERY",
    description: "Project delivered with care.",
  },
];

function AboutPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="about-page">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="about-hero">
        <div className="about-hero-image">
          <img
            src={img}
            alt="Luxury modern kitchen interior"
          />
        </div>

        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <div className="section-label">
                        <i></i>

            <span>ABOUT US</span>
          </div>

          <h2>
            Designing
            <br />
            spaces that
            <br />
            <em>feel like home.</em>
          </h2>

          <p>
            We are a team of passionate designers, skilled craftsmen and
            visionaries, dedicated to creating modular kitchens and living
            spaces that combine beauty, function and timeless design.
          </p>

        </div>
      </section>

      {/* =====================================================
          FEATURE STRIP
      ====================================================== */}

      <section className="feature-strip">
        <div className="feature-container">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                className={`feature-item ${
                  index !== features.length - 1 ? "has-border" : ""
                }`}
                key={feature.title}
              >
                <div className="feature-icon">
                  <Icon size={28} strokeWidth={1.25} />
                </div>

                <div className="feature-content">
                  <h3>
                    {feature.title}
                    <br />
                    {feature.subtitle}
                  </h3>

                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          OUR JOURNEY
      ====================================================== */}

      <section className="journey-section" id="journey">
        <div className="journey-container">

          <div className="journey-copy">
            <div className="section-label">
                              <i></i>
              <span>OUR JOURNEY</span>
            </div>

            <h2>
              Crafting beautiful
              <br />
              <em>spaces since day one.</em>
            </h2>

            <p>
              With a deep understanding of modern living, we bring together
              design, craftsmanship and innovation to deliver modular kitchens
              and interiors that inspire.
            </p>
            
          </div>

          <div className="journey-image">
            <img
              src={img1}
              alt="journey"
            />
          </div>

          <div className="stats-grid">
            <div className="stat">
              <strong>500+</strong>
              <span>
                PROJECTS
                <br />
                COMPLETED
              </span>
            </div>

            <div className="stat">
              <strong>10+</strong>
              <span>
                YEARS OF
                <br />
                EXPERIENCE
              </span>
            </div>

            <div className="stat">
              <strong>100%</strong>
              <span>
                CLIENT
                <br />
                SATISFACTION
              </span>
            </div>

            <div className="stat">
              <strong>3</strong>
              <span>
                SHOWROOMS
                <br />
                ACROSS INDIA
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          FEATURED PROJECTS
      ====================================================== */}

      <section className="projects-section">

        <div className="projects-header">

          <div className="projects-intro">
            <div className="section-label">
                 <i></i>
              <span>OUR WORK</span>
             
            </div>

            <h2>Featured projects</h2>

            <p>
              Explore some of our recent projects and see how we've
              transformed spaces into beautiful, functional kitchens.
            </p>
          </div>

          <div className="project-filters">
            {["ALL", "MODERN", "MINIMAL", "CLASSIC", "LUXURY"].map(
              (filter) => (
                <button
                  key={filter}
                  className={activeFilter === filter ? "active" : ""}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>

        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.title}>

              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="project-overlay">
                  <span>VIEW PROJECT</span>
                  <ArrowRight size={17} />
                </div>
              </div>

              <div className="project-info">
                <h3>{project.title}</h3>

                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                />
              </div>

            </article>
          ))}
        </div>

      </section>

    </main>
  );
}

export default AboutPage;