import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import CartPage from "../CartPage/CartPage"; // Import CartPage for the popup
import logo from "../../images/Pink Modern Simple Bakery Logo (1) 1.png";
import search from "../../images/Group.png";
import admin from "../../images/Group (1).png";
import cart from "../../images/Vector.png";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Close cart when clicking outside the cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Keki's Bakery Logo" />
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#shop">Shop</a>
          </li>
          <li>
            <a href="#luxury-cakes">Luxury Cakes</a>
          </li>
          <li>
            <a href="#chocolates">Chocolates</a>
          </li>
          <li>
            <a href="#gifting">Gifting</a>
          </li>
          <li>
            <a href="#contact-us">Contact Us</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
        </ul>
        <div className="navbar-icons">
          <img src={search} alt="Search Icon" />
          <img src={admin} alt="Admin Icon" />
          <img
            src={cart}
            alt="Cart Icon"
            className="cart-icon"
            onClick={toggleCart}
          />
          <button className="hamburger" onClick={toggleCart}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        {isCartOpen && (
  <div className="cart-overlay" onClick={toggleCart}>
    <div className="cart-popup" ref={cartRef} onClick={(e) => e.stopPropagation()}>
      <CartPage />
    </div>
  </div>
)}

      </nav>
    </>
  );
};

export default Navbar;
