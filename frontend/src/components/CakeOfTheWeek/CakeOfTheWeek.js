import React, { useState } from "react";
import "./CakeOfTheWeek.css";
import cakeImage from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"; // Replace with the correct path to your cake image

const CakeOfTheWeek = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
    <section className="cotw-section">
    {/* Heading placed above everything */}
    <h2 className="cotw-heading">Cake of the Week</h2>
  
    {/* Content below heading */}
    <div className="cotw-card">
      <div className="cotw-image">
        <img src={cakeImage} alt="Triple Chocolate Cheesecake" />
      </div>
      <div className="cotw-details">
        <h3 className="cotw-name">Triple Chocolate Cheesecake - Eggless</h3>
        <p className="cotw-price">
          from <span>Rs. 2500.00</span>
        </p>
        <div className="cotw-quantity-selector">
          <button onClick={decreaseQuantity} className="cotw-quantity-button">-</button>
          <span className="cotw-quantity">{quantity}</span>
          <button onClick={increaseQuantity} className="cotw-quantity-button">+</button>
        </div>
        <p className="cotw-description">
          Indulge in the ultimate chocolate lover’s dream with our Triple Chocolate Cheesecake. This decadent dessert features a rich, velvety chocolate cheesecake layered atop a buttery chocolate cookie crust.
        </p>
        <div className="cotw-buttons">
          <button className="cotw-add-to-cart">Add to Cart</button>
          <button className="cotw-buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  </section>

  {/* <div className="section-line"></div> */}
  </>
  
  );
};

export default CakeOfTheWeek;
