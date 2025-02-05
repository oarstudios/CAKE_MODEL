import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import logo from "../../images/Pink Modern Simple Bakery Logo (1) 1.png";
import admin from "../../images/Group (1).png";
import search from "../../images/Group.png"; // Import search icon

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  // Navigate to My Account page
  const handleAdminClick = () => {
    navigate("/my-account");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo-container">
        <Link to="/" className="admin-navbar-logo-link">
          <img src={logo} alt="Keki's Bakery Logo" className="admin-navbar-logo" />
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} className="admin-navbar-admin-link">
          <span className="admin-text">Admin</span>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <ul className={`admin-navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/admin/creatives">Creatives</Link>
        </li>
        <li>
          <Link to="/admin/customers">Customers</Link>
        </li>
      </ul>

      <div className="admin-navbar-icons">
        {searchOpen && (
          <input
            type="text"
            placeholder="Search..."
            className="admin-navbar-search-input"
          />
        )}
        <img
          src={search}
          alt="Search Icon"
          className="admin-navbar-search-icon"
          onClick={toggleSearch}
        />
        <img src={admin} alt="Admin Icon" onClick={handleAdminClick} />
        <button className="admin-hamburger" onClick={toggleMenu}>
          <div className="admin-hamburger-line"></div>
          <div className="admin-hamburger-line"></div>
          <div className="admin-hamburger-line"></div>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
