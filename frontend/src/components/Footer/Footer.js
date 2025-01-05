import React from "react";
import "./Footer.css";
import logo from "../../images/Pink Modern Simple Bakery Logo (1) 1 (1).png";
import linkedin from "../../images/mdi_linkedin.png";
import twitter from "../../images/Clip path group.png";
import facebook from "../../images/Vector (1).png";
import instagram from "../../images/ri_instagram-fill.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src={logo} alt="Keki's Bakery Logo" className="logo" />
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Help & Information</h3>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/refund-policy">Refund Policy</a></li>
              <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Shop by Category</h3>
            <ul>
              <li><a href="/luxury-cakes">Luxury Cakes</a></li>
              <li><a href="/classy-chocolates">Classy Chocolates</a></li>
              <li><a href="/gift-boxes">Gift Boxes</a></li>
              <li><a href="/brownies">Brownies</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Menu</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blogs">Blogs</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        {/* Social Media Section */}
        <div className="footer-social">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>&copy; KEKI CAKES 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
