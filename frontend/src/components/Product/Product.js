import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import cakeImage from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"; // Replace with your actual image path

const Product = ({ toggleCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("1 KG");

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleWeightChange = (weight) => setSelectedWeight(weight);

  const handleAddToCart = () => {
    const product = {
      name: "Triple Chocolate Cheesecake - Eggless",
      price: 2500,
      quantity,
      weight: selectedWeight,
    };

    // Trigger the cart to open
    toggleCart();

    console.log("Product added to cart:", product);
  };

  return (
    <div className="forcolor">
      <div className="product-container">
        <div className="product-image-section">
          <img src={cakeImage} alt="Triple Chocolate Cheesecake" className="main-image" />
          <div className="thumbnail-container">
            <img src={cakeImage} alt="Thumbnail 1" className="thumbnail" />
            <img src={cakeImage} alt="Thumbnail 2" className="thumbnail" />
            <img src={cakeImage} alt="Thumbnail 3" className="thumbnail" />
          </div>
        </div>

        <div className="product-details-section">
          <h1 className="product-name">Triple Chocolate Cheesecake - Eggless</h1>
          <p className="product-price">Rs. 2500.00</p>
          <p className="product-description">
            Indulge in the ultimate chocolate lover's dream with our Triple Chocolate Cheesecake.
          </p>

          <div className="product-quantity-weight">
            <div className="productPage-quantity-selector">
              <span className="smallHeadings">Quantity</span>
              <button onClick={decreaseQuantity} className="productPage-quantity-button">-</button>
              <span className="productPage-quantity">{quantity}</span>
              <button onClick={increaseQuantity} className="productPage-quantity-button">+</button>
            </div>

            <div className="weight-selector">
              <span className="smallHeadings">Weight</span>
              <button
                className={`weight-option ${selectedWeight === "1/2 KG" ? "selected" : ""}`}
                onClick={() => handleWeightChange("1/2 KG")}
              >
                1/2 KG
              </button>
              <button
                className={`weight-option ${selectedWeight === "1 KG" ? "selected" : ""}`}
                onClick={() => handleWeightChange("1 KG")}
              >
                1 KG
              </button>
              <button
                className={`weight-option ${selectedWeight === "2 KG" ? "selected" : ""}`}
                onClick={() => handleWeightChange("2 KG")}
              >
                2 KG
              </button>
            </div>
          </div>

          <div className="cotw-buttons">
            <button className="cotw-add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link to="/billing" className="cotw-buy-now">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      <hr className="cotw-divider" />
    </div>
  );
};

export default Product;
