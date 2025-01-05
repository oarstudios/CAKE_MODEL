import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../images/Pink Modern Simple Bakery Logo (1) 1.png";
import search from "../../images/Group.png";
import admin from "../../images/Group (1).png";
import cart from "../../images/Vector.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Keki's Bakery Logo" />
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#luxury-cakes">Luxury Cakes</a></li>
        <li><a href="#chocolates">Chocolates</a></li>
        <li><a href="#gifting">Gifting</a></li>
        <li><a href="#contact-us">Contact Us</a></li>
        <li><a href="#about-us">About Us</a></li>
      </ul>
      <div className="navbar-icons">
        <img src={search} alt="Search Icon" />
        <img src={admin} alt="Admin Icon" />
        <img src={cart} alt="Cart Icon" />
        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
