import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useSignup from "../../hooks/useSignup";
import useNotify from "../../hooks/useNotify";
import { useAuthContext } from "../../hooks/useAuthContext";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();
  const {notify} = useNotify()
  const {dispatch} = useAuthContext()

  window.scrollTo({
    top: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setLocalError("All fields are required.");
      return;
    }
    await signup(username, email, password, "User");
  };

  useEffect(() => {
    if (error === false) {
      console.log("Successfully signed up");
      notify('Signed up successfully', 'success')
      setTimeout(() => navigate("/"), 1000);
    }
  }, [error, navigate]);

  // const handleGoogleSuccess = (credentialResponse) => {
  //   console.log("Google sign-in success", credentialResponse);
  //   setTimeout(() => navigate("/"), 1000);
  // };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:3001/users/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Google login failed');
      }
      console.log('Google login successfull:', data);
      notify('Signed up successfully', 'success')
      // Save user data and navigate
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      setTimeout(() => {
        navigate('/');
        
      }, 500);
    } catch (err) {
      notify('Error while signup', "error")
      console.error('Google login error:', err.message);
    }
  };

  const handleGoogleError = () => {
    console.log("Google sign-in error");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="error-message">
            {localError || error}
          </span>
          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="google-signup-button">
          <GoogleOAuthProvider clientId="581379327416-6t7bsonglpbktsnbvsq0jq1fskctfgb3.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_blue"
              shape="pill"
              text="continue_with"
              size="large"
            />
          </GoogleOAuthProvider>
        </div>
        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
