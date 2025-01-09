import React, { useState } from "react";
import "./CartPage.css";
import removeIcon from "../../images/remove-icon.png"; // Replace with your remove icon image path
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

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-container">
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
        <img src={item.image} alt={item.name} className="cart-product-image" />
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

{/* <div className="total-price-container">
  <p className="total-price-label">Total Price:</p>
  <p className="total-price-value">Rs {subtotal}</p>
</div> */}

          <div className="cart-summary">
  <div className="summary-header">
    <p className="summary-title">Details</p>
    <p className="summary-title">Subtotal</p>
  </div>
  <div className="summary-body">
    <p className="summary-text">Including Taxes* <br /> Shipping Calculated at Checkout*</p>
    <p className="subtotal-amount">Rs {subtotal}</p>
  </div>
</div>


          <button className="cotw-buy-now">Proceed to Checkout</button>
        </>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Add items to your cart to view them here.</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
