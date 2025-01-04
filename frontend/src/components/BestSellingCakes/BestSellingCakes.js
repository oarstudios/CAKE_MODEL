import React from "react";
import "./BestSellingCakes.css";
import cake1 from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1 (1).png"
import cake2 from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1.png"

const cakes = [
  {
    id: 1,
    name: "Triple Chocolate Cheesecake",
    price: "2,200.00",
    image: cake1,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Strawberry Chocolate",
    price: "1,600.00",
    image: cake2,
    tag: null,
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    price: "1,800.00",
    image: cake1,
    tag: null,
  },
  {
    id: 1,
    name: "Triple Chocolate Cheesecake",
    price: "2,200.00",
    image: cake1,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Strawberry Chocolate",
    price: "1,600.00",
    image: cake2,
    tag: null,
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    price: "1,800.00",
    image: cake1,
    tag: null,
  },
  {
    id: 1,
    name: "Triple Chocolate Cheesecake",
    price: "2,200.00",
    image: cake1,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Strawberry Chocolate",
    price: "1,600.00",
    image: cake2,
    tag: null,
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    price: "1,800.00",
    image: cake1,
    tag: null,
  },
  // Repeat more items to make 3 rows
];

const BestSellingCakes = () => {
  return (
    <section className="best-selling-cakes">
      <h2 className="section-title">Best Selling Cakes</h2>
      <div className="cake-grid">
        {cakes.map((cake) => (
          <div className="cake-card" key={cake.id}>
            <div className="cake-image">
              <img src={cake.image} alt={cake.name} />
              {cake.tag && <span className="cake-tag">{cake.tag}</span>}
            </div>
            <div className="cake-details">
              <h3 className="cake-name">{cake.name}</h3>
              <p className="cake-price"><span className="cake-price-span">from</span> Rs. {cake.price}</p>
              <div className="cake-buttons">
                <button className="view-button">View</button>
                <button className="add-button">Add to Basket</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellingCakes;
