import React, { useState } from "react";
import "./BillingPage.css";
import cake from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1 (1).png";
import removeIcon from "../../images/remove-icon.png";

const BillingPage = () => {
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
      name: "Triple Chocolate Cheesecake - Eggless",
      price: 2500,
      quantity: 1,
      image: cake,
    },
  ]);

  const [differentBillingAddress, setDifferentBillingAddress] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="billing-page">
      <div className="billing-left">
        <form>
         
          <div className="contact-header">
            <h2 className="heading-billing-h2">Contact</h2>
            <a href="/login" className="log-in">
              Log In
            </a>
          </div>
          <div className="different">
          <input type="email" placeholder="Email" required />

          <h2 className="heading-billing-h2">Delivery</h2>
          <div className="delivery-grid">
            <input type="text" placeholder="First Name*" required />
            <input type="text" placeholder="Last Name*" required />
          </div>

          <div className="delivery-grid-2">
            <input type="text" placeholder="Address*" required />
            <input type="text" placeholder="Landmark" />
          </div>

          <div className="state-city-pincode">
            <input type="text" placeholder="State*" required />
            <input type="text" placeholder="City*" required />
            <input type="text" placeholder="PIN Code*" required />
          </div>
          <div className="phone-field">
            <input type="text" placeholder="Phone*" required />
          </div>
          </div>

          <h2 className="heading-billing-h2">Billing Address</h2>
          <div className="billing-options">
            <label
              className={
                !differentBillingAddress
                  ? "radio-option selected"
                  : "radio-option"
              }
            >
              <input
                type="radio"
                name="billingAddress"
                checked={!differentBillingAddress}
                onChange={() => setDifferentBillingAddress(false)}
              />
              Same as shipping Address
            </label>
            <label
              className={
                differentBillingAddress
                  ? "radio-option selected"
                  : "radio-option"
              }
            >
              <input
                type="radio"
                name="billingAddress"
                checked={differentBillingAddress}
                onChange={() => setDifferentBillingAddress(true)}
              />
              Use a different billing Address
            </label>
          </div>

          {differentBillingAddress && (
  <div className="billing-address-fields">
    <div className="delivery-grid">
      <input
        type="text"
        placeholder="First Name*"
        required
        className="form-field"
      />
      <input
        type="text"
        placeholder="Last Name*"
        required
        className="form-field"
      />
    </div>

    <div className="delivery-grid-2">
      <input
        type="text"
        placeholder="Address*"
        required
        className="form-field"
      />
      <input
        type="text"
        placeholder="Landmark"
        
        className="form-field"
      />
    </div>

    <div className="state-city-pincode">
      <input
        type="text"
        placeholder="State*"
        required
        className="form-field"
      />
      <input
        type="text"
        placeholder="City*"
        required
        className="form-field"
      />
      <input
        type="text"
        placeholder="PIN Code*"
        required
        className="form-field"
      />
    </div>

    <div className="phone-field">
      <input
        type="text"
        placeholder="Phone*"
        required
        className="form-field"
      />
    </div>
  </div>
)}

        </form>
        <button className="pay-now">Pay Now</button>
      </div>

      <div className="billing-right">
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
        <div className="summary">
          <div className="summary-item">
            <span className="shipping-heading">Shipping</span>
            <span className="shipping-rates">Free</span>
          </div>
          <div className="summary-item">
            <span className="shipping-total-heading">Total</span>
            <span className="shipping-total-amount">Rs {subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
