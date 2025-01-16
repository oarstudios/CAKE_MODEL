import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AdminNavbar from "./components/Admin/AdminNavbar"; // Import AdminNavbar
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
import OrderSection from "./components/OrderSection/OrderSection";
import AdminHomePage from "./components/Admin/AdminHomePage";
import AddNewProduct from "./components/Admin/AddNewProduct";
import EditProduct from "./components/Admin/EditProduct";


const App = () => {
  return (
    <Router>
      <MainContent />
      <Footer />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();

  // Check if current route is for admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <div className={isAdminRoute ? "admin-container" : "app-container"}>
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

          {/* Billing Page Route */}
          <Route path="/billing" element={<BillingPage />} />

          {/* My Account Page Route */}
          <Route path="/my-account" element={<MyAccount />} />

          {/* Order Details Route */}
          <Route path="/order/:id" element={<OrderSection />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/add-product" element={<AddNewProduct />} />
          <Route path="/admin/edit-product" element={<EditProduct />} />
        </Routes>
      </div>
    </>
  );
};


export default App;
