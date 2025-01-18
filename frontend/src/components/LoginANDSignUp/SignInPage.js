import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./SignInPage.css";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useLogin from "../../hooks/useLogin";
import useNotify from "../../hooks/useNotify";
import { useAuthContext } from "../../hooks/useAuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const { notify } = useNotify();
  const location = useLocation(); // Get location to check previous route

  // Scroll to top when the page loads
  window.scrollTo({
    top: 0,
  });
  const {dispatch} = useAuthContext()

  // Handle Google Login Success
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
        console.log('Google login successful:', data);
        notify('Logged in successfully', 'success');

        // Save user data to localStorage and update AuthContext
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'LOGIN', payload: data });  // Update context here

        setTimeout(() => {
            navigate('/');
        }, 500);
    } catch (err) {
        notify('Error while login', 'error');
        console.error('Google login error:', err.message);
    }
};


  // Handle Google Login Error
  const handleGoogleError = () => {
    console.error('Google sign-in error');
  };

  // Handle Regular Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  // Navigate on Successful Login
  useEffect(() => {
    if (error === false) {
      console.log("Successfully logged in");
      notify('Logged in successfully', 'success');
      setTimeout(() => {
        navigate('/', { state: { fromSignIn: true } }); // Pass state to trigger reload
      }, 500);
    }
  }, [error, navigate]);

  // Refresh page if coming from the SignIn page
  useEffect(() => {
    if (location.state?.fromSignIn) {
      window.location.reload();
    }
  }, [location]);

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h1 className="signin-title">Sign In</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="error-message">{error}</span>
          <button type="submit" className="signin-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
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
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup" >Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
