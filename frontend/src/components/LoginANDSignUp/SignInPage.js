import React from "react";
import { Link } from "react-router-dom";
import "./SignInPage.css";
import Google from "../../images/devicon_google.png";

const SignInPage = () => {
  return (
    <div className="signin-page">
      <div className="signin-container">
        <h1 className="signin-title">Sign In</h1>
        <form className="signin-form">
          <input
            type="email"
            placeholder="Email/ Phone no."
            className="signin-input"
          />
          <span className="error-message">*Incorrect Email</span>
          <input
            type="password"
            placeholder="Password"
            className="signin-input"
          />
          <span className="error-message">*Incorrect Password</span>
          <button type="submit" className="signin-button">
            Sign In
          </button>
          <button type="button" className="google-signin-button">
            <img src={Google} alt="Google Icon" className="google-icon" />
            Sign in with Google
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
