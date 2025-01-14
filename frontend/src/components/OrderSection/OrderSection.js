import React, { useState } from "react";
import "./OrderSection.css";
import cake from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1 (1).png";
import FullStar from "../../images/NoRating.png"; // Filled star image
import EmptyStar from "../../images/Rating.png"; // Empty star image
import UploadIcon from "../../images/Vector.svg"; // Upload icon

const OrderSection = () => {
  const [inputs, setInputs] = useState({});

  const order = {
    orderId: "110387654",
    date: "25th Dec 2024",
    deliveredDate: "31st Dec 2024",
    customer: {
      name: "Omkar Garate",
      phone: "+91 99888 77766",
      address:
        "501, Elita Apartments, Sector 6, Plot 22, Kamothe, Navi Mumbai, 410209",
    },
    items: [
      {
        id: 1,
        name: "Triple Chocolate Cheesecake - Eggless",
        price: 2500,
        quantity: 2,
        image: cake,
        rating: 4,
      },
      {
        id: 2,
        name: "Triple Chocolate Cheesecake - Eggless",
        price: 2500,
        quantity: 1,
        image: cake,
        rating: 5,
      },
    ],
    shipping: "Free",
  };

  const totalPrice = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleTextChange = (e, itemId) => {
    const text = e.target.value;
    setInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        text: text.trim() ? text : "",
      },
    }));
  };

  const handleImageUpload = (e, itemId) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        images: [...(prev[itemId]?.images || []), ...newImages],
      },
    }));
  };

  const isSubmitEnabled = (itemId) => {
    const itemInputs = inputs[itemId];
    return itemInputs?.text || (itemInputs?.images?.length > 0);
  };

  return (
    <div className="order-section">
      <div className="order-left">
        <h3 className="order-id">Order ID {order.orderId}</h3>
        <h2 className="order-date">{order.date}</h2>
        <p className="delivered-date">
          Delivered on <span>{order.deliveredDate}</span>
        </p>
        <h3 className="customer-name">{order.customer.name}</h3>
        <p className="customer-phone">
          Phone <br /> {order.customer.phone}
        </p>
        <p className="customer-address">
          Address <br /> {order.customer.address}
        </p>

        <h3 className="feedback-title">Tell us how much you loved it!</h3>
        {order.items.map((item) => (
          <div className="feedback-item" key={item.id}>
            <div className="item-details">
              <img src={item.image} alt={item.name} className="item-image" />
              <p className="item-name">{item.name}</p>
            </div>
            <div className="rating-section">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < item.rating ? FullStar : EmptyStar}
                  alt={index < item.rating ? "Full Star" : "Empty Star"}
                  className="star-icon"
                />
              ))}
            </div>
            <div className="review-container">
              <textarea
                className="review-box"
                placeholder="Write a review"
                onChange={(e) => handleTextChange(e, item.id)}
              ></textarea>
              <div className="image-preview-grid">
                {(inputs[item.id]?.images || []).map((imageUrl, index) => (
                  <div key={index} className="image-preview">
                    <img
                      src={imageUrl}
                      alt={`Uploaded ${index + 1}`}
                      className="uploaded-preview"
                    />
                  </div>
                ))}
              </div>
              <label htmlFor={`upload-${item.id}`} className="upload-icon">
                <img src={UploadIcon} alt="Upload Icon" />
              </label>
              <input
                id={`upload-${item.id}`}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, item.id)}
                style={{ display: "none" }}
              />
              <button
                className="submit-btn"
                disabled={!isSubmitEnabled(item.id)}
                style={{
                  backgroundColor: isSubmitEnabled(item.id)
                    ? " rgba(213, 178, 107, 1)"
                    : "rgba(200, 200, 200, 1)",
                  cursor: isSubmitEnabled(item.id) ? "pointer" : "not-allowed",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="billing-right">
        <div className="cart-items">
          {order.items.map((item) => (
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
            </div>
          ))}
        </div>
        <div className="summary">
          <div className="summary-item">
            <span className="shipping-heading">Shipping</span>
            <span className="shipping-rates">{order.shipping}</span>
          </div>
          <div className="summary-item">
            <span className="shipping-total-heading">Total</span>
            <span className="shipping-total-amount">Rs {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
