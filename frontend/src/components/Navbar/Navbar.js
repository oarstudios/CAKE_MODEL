import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import CartPage from "../CartPage/CartPage"; // Import the CartPage component
import logo from "../../images/Pink Modern Simple Bakery Logo (1) 1.png";
import search from "../../images/Group.png";
import admin from "../../images/Group (1).png";
import cart from "../../images/Vector.png";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();
  const {user} = useAuthContext();

  // Toggle cart visibility
  const toggleCart = () => setIsCartOpen((prevState) => !prevState);

  // Open the cart explicitly (for Add to Cart functionality)
  const openCart = () => setIsCartOpen(true);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Navigate to My Account page
  const handleAdminClick = () => {
    if(user)
    {
      navigate("/my-account"); // Replace '/my-account' with your actual route path
    }else{
      navigate("/signin")
    }
  };

  // Detect screen size
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleOutsideEvent = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleOutsideEvent);
    } else {
      document.removeEventListener("mousedown", handleOutsideEvent);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideEvent);
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
        <ul className={`navbar-links ${isMobileMenuOpen ? "open" : ""}`}>
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
          <button className="hamburger" onClick={toggleMobileMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        {isCartOpen && (
          <div className="cart-overlay">
            <div className="cart-popup" ref={cartRef}>
              {isMobile && (
                <button
                  className="mobile-back-button"
                  onClick={() => setIsCartOpen(false)}
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
