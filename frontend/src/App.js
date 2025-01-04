import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./components/LoginANDSignUp/SignUpPage";
import SignInPage from "./components/LoginANDSignUp/SignInPage";
import SliderComponent from "./components/Slider/SliderComponent";
import BestSellingCakes from "./components/BestSellingCakes/BestSellingCakes"; // Import the component
import BestSellingCoco from "./components/BestSellingCoco/BestSellingCoco";
import CakeOfTheWeek from "./components/CakeOfTheWeek/CakeOfTheWeek";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              {/* <SliderComponent />  */}
              <BestSellingCakes /> {/* Add Best Selling Cakes here */}
              <CakeOfTheWeek/>
              <BestSellingCoco/>
            
            </>
          } />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

