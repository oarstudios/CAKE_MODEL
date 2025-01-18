import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import Google from "../../images/devicon_google.png";
import useSignup from "../../hooks/useSignup";

const SignUpPage = () => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const {signup, error, isLoading} = useSignup()

  const navigate = useNavigate()

// Authentication 

const handleSubmit = async (e) => {
  e.preventDefault();
  await signup(username, email, password, "User");      
};

useEffect(()=>{
  if(error === false)
    {
      // console.log("Successfully logged in")
      console.log("Successfully logged in", "success")
      setTimeout(() => navigate('/'), 1000); 
    }else{
      console.log(error)
    }
},[error])

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="signup-input" onChange={(e)=>setUsername(e.target.value)}/>
          <input
            type="email"
            placeholder="Email/ Phone no."
            className="signup-input"
            onChange={(e)=>setEmail(e.target.value)}
          />
          {/* <span className="error-message">*Incorrect Email</span> */}
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            onChange={(e)=>setPassword(e.target.value)}
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
