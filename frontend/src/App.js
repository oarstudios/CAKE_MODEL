import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AdminNavbar from "./components/Admin/AdminNavbar";
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
import AdminOrders from "./components/Admin/AdminOrders";
import CreativesPage from "./components/Admin/CreativesPage";
import BillingForSingle from "./components/BillingPage/BillingForSingle";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {



  return (
    <Router>
      <ScrollToTop /> {/* Scroll to top on route change */}
      <MainContent />
      <Footer />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const {user} = useAuthContext();
  console.log(user)

  // Check if current route is for admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {user?.userType === "Admin" ? <AdminNavbar /> : <Navbar />}
      <div className={user?.userType === "Admin" ? "admin-container" : "app-container"}>
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
            path="/product/:id"
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
          <Route path="/billing/:quantity/:weight/:price/:id" element={<BillingForSingle />} />

          {/* My Account Page Route */}
          <Route path="/my-account" element={<MyAccount />} />

          {/* Order Details Route */}
          <Route path="/order/:id" element={<OrderSection />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/add-product" element={<AddNewProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/creatives" element={<CreativesPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
