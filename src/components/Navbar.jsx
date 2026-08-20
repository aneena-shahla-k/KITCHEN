import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <NavLink
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <span>KitchenCraft</span>
      </NavLink>


      {/* NAVIGATION */}
      <div className={`navbar-links ${open ? "open" : ""}`}>

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


      {/* QUOTE */}
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


      {/* MOBILE MENU */}
      <button
        className="navbar-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? (
          <X size={22} />
        ) : (
          <Menu size={22} />
        )}
      </button>

    </nav>
  );
};

export default Navbar;