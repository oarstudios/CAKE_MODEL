import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import CartPage from "../CartPage/CartPage"; // Import CartPage for the popup
import logo from "../../images/Pink Modern Simple Bakery Logo (1) 1.png";
import search from "../../images/Group.png";
import admin from "../../images/Group (1).png";
import cart from "../../images/Vector.png";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  // Navigate to My Account page
  const handleAdminClick = () => {
    navigate("/my-account"); // Replace '/my-account' with your actual route path
  };

  // Detect screen size
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Close cart when clicking outside or hovering outside the cart
  useEffect(() => {
    const handleOutsideEvent = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleOutsideEvent);
      document.addEventListener("mousemove", handleOutsideEvent);
    } else {
      document.removeEventListener("mousedown", handleOutsideEvent);
      document.removeEventListener("mousemove", handleOutsideEvent);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideEvent);
      document.removeEventListener("mousemove", handleOutsideEvent);
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
          <img src={admin} alt="Admin Icon" onClick={handleAdminClick} />
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
          <div className="cart-overlay">
            <div
              className="cart-popup"
              ref={cartRef}
              onMouseLeave={() => setIsCartOpen(false)} // Close cart on hover outside
            >
              {isMobile && (
                <button
                  className="mobile-back-button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate(0); // Navigate to the previous page
                  }}
                >
                  Back
                </button>
              )}
              <CartPage closeCart={() => setIsCartOpen(false)} />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
