import React from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";
import Google from "../../images/devicon_google.png";

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form">
        <input type="text" placeholder="Name" className="signup-input" />
          <input
            type="email"
            placeholder="Email/ Phone no."
            className="signup-input"
          />
          <span className="error-message">*Incorrect Email</span>
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
          />
          <span className="error-message">*Password is too weak</span>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <button type="button" className="google-signup-button">
            <img src={Google} alt="Google Icon" className="google-icon" />
            Sign up with Google
          </button>
        </form>
        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
