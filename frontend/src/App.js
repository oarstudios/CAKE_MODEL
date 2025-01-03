import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./components/LoginANDSignUp/SignUpPage";
import SignInPage from "./components/LoginANDSignUp/SignInPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
