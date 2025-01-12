import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import removeIcon from "../../images/remove-icon.png";
import cake from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1 (1).png";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Triple Chocolate Cheesecake - Eggless",
      price: 2500,
      quantity: 2,
      image: cake,
    },
    {
      id: 2,
      name: "Classic Vanilla Cheesecake - Eggless",
      price: 2500,
      quantity: 1,
      image: cake,
    },
  ]);

  const [isMobile, setIsMobile] = useState(false); // Detect mobile view
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Update the breakpoint as needed
    };
    checkIsMobile();

    // Listen for screen resize
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <div
        className="cart-container"
      >
        {/* Show 'Go Back' button on mobile */}
        {isMobile && (
          <button
            className="go-back-button"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            &larr;
          </button>
        )}

        <h1 className="cart-title">Cart</h1>
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header">
              <span>PRODUCT</span>
              <span>QUANTITY</span>
            </div>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-product-info">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-product-image"
                    />
                    <div className="cart-product-details">
                      <p className="cart-product-name">{item.name}</p>
                      <p className="cart-product-price">Rs {item.price}</p>
                    </div>
                  </div>
                  <div className="quantity-info">
                    <p className="quantity">x {item.quantity}</p>
                  </div>
                  <div className="remove-item">
                    <img
                      src={removeIcon}
                      alt="Remove"
                      className="remove-icon"
                      onClick={() => removeItem(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-header">
                <p className="summary-title">Details</p>
                <p className="summary-title">Subtotal</p>
              </div>
              <div className="summary-body">
                <p className="summary-text">
                  Including Taxes* <br /> Shipping Calculated at Checkout*
                </p>
                <p className="subtotal-amount">Rs {subtotal}</p>
              </div>
            </div>
            <button
              className="cotw-buy-now"
              onClick={() => navigate("/billing")}
            >
              Proceed to Checkout
            </button>
          </>
        ) : (
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>
            <p>Add items to your cart to view them here.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
