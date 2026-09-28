import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import logo from "../images/logo.PNG";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">

      {/* =====================================================
          LOGO
      ====================================================== */}

      <NavLink
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
        aria-label="KitchenCraft Home"
      >
        <img
          src={logo}
          alt="KitchenCraft Logo"
          className="navbar-logo-img"
        />
      </NavLink>


      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div
        className={`navbar-links ${open ? "open" : ""}`}
      >

        <NavLink
          to="/"
          end
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/materials"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Materials
        </NavLink>


        <NavLink
          to="/projects"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Projects
        </NavLink>


        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Contact
        </NavLink>

      </div>


      {/* =====================================================
          GET A QUOTE
      ====================================================== */}

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `navbar-quote ${isActive ? "quote-active" : ""}`
        }
        onClick={closeMenu}
      >
        <span>Get a Quote</span>

        <ArrowRight size={15} />
      </NavLink>


      {/* =====================================================
          MOBILE MENU BUTTON
      ====================================================== */}

      <button
        type="button"
        className="navbar-menu"
        onClick={toggleMenu}
        aria-label={
          open
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={open}
      >
        {open ? (
          <X size={21} strokeWidth={1.8} />
        ) : (
          <Menu size={21} strokeWidth={1.8} />
        )}
      </button>

    </nav>
  );
};

export default Navbar;