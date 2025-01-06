import React from "react";
import { Link } from "react-router-dom";
import "./BestSellingCoco.css";
import cake1 from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1 (1).png";
import cake2 from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1.png";

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
];

const BestSellingCoco = () => {
  return (
    <>
      <section className="best-selling-coco">
        <h2 className="section-title-coco">Best Selling Chocolates</h2>
        <div className="coco-grid">
          {cakes.map((cake) => (
            <div className="coco-card" key={cake.id}>
              <div className="coco-image">
                <Link to="/product">
                  <img src={cake.image} alt={cake.name} />
                </Link>
                {cake.tag && <span className="coco-tag">{cake.tag}</span>}
              </div>
              <div className="coco-details">
                <h3 className="coco-name">{cake.name}</h3>
                <p className="coco-price">
                  <span className="coco-price-span">from</span> Rs. {cake.price}
                </p>
                <div className="coco-buttons">
                  <button className="view-button-coco">View</button>
                  <button className="add-button-coco">Add to Basket</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="section-line"></div>
    </>
  );
};
export default BestSellingCoco;
