import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./components/LoginANDSignUp/SignUpPage";
import SignInPage from "./components/LoginANDSignUp/SignInPage";
import SliderComponent from "./components/Slider/SliderComponent";
import BestSellingCakes from "./components/BestSellingCakes/BestSellingCakes";
import BestSellingCoco from "./components/BestSellingCoco/BestSellingCoco";
import CakeOfTheWeek from "./components/CakeOfTheWeek/CakeOfTheWeek";
import Banner from "./components/Banner/Banner";
import Product from "./components/Product/Product";
import CustomerReviews from "./components/CustomerReviews/CustomerReviews";
import YouMayAlsoLike from "./components/YouMayAlsoLike/YouMayAlsoLike";
import BillingPage from "./components/BillingPage/BillingPage";
import MyAccount from "./components/MyAccount/MyAccount";


const App = () => {
  return (
    <Router>
      <Navbar />
      <MainContent />
      <Footer />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();

  // Exclude `app-container` class for `/product`, `/signin`, and `/signup` routes
  const excludedRoutes = ["/product", "/signin", "/signup", "/billing", "/my-account"];
  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <div className={isExcludedRoute ? "" : "app-container"}>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <SliderComponent />
              <BestSellingCakes />
              <CakeOfTheWeek />
              <Banner />
              <BestSellingCoco />
            </>
          }
        />

        {/* Sign Up Page Route */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* Sign In Page Route */}
        <Route path="/signin" element={<SignInPage />} />

        {/* Product Page Route */}
        <Route
          path="/product"
          element={
            <>
              <Product />
              <CustomerReviews />
              <YouMayAlsoLike />
            </>
          }
        />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/my-account" element={<MyAccount />} />

      </Routes>
    </div>
  );
};


export default App;
