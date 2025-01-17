import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./AdminHomePage.css";
import cake1 from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"
import cake2 from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"

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
      id: 4,
      name: "Triple Chocolate Cheesecake",
      price: "2,200.00",
      image: cake1,
      tag: "Bestseller",
    },
    {
      id: 5,
      name: "Strawberry Chocolate",
      price: "1,600.00",
      image: cake2,
      tag: null,
    },
    {
      id: 6,
      name: "Chocolate Mousse",
      price: "1,800.00",
      image: cake1,
      tag: null,
    },
    {
      id: 7,
      name: "Triple Chocolate Cheesecake",
      price: "2,200.00",
      image: cake1,
      tag: "Bestseller",
    },
    {
      id: 8,
      name: "Strawberry Chocolate",
      price: "1,600.00",
      image: cake2,
      tag: null,
    },
    {
      id: 9,
      name: "Chocolate Mousse",
      price: "1,800.00",
      image: cake1,
      tag: null,
    },
    // Repeat more items to make 3 rows
  ];

const AdminHomePage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Triple Chocolate Cheesecake", price: 2200, image: "cheesecake.jpg" },
    { id: 2, name: "Straw Berry Chocolate", price: 1600, image: "strawberry.jpg" },
    { id: 3, name: "Chocolate Mousse", price: 1800, image: "mousse.jpg" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-home-page">
  
      <div className="main-content">
      <div className="search-bar">
  <input
    type="text"
    placeholder="Search Products"
    value={searchQuery}
    onChange={handleSearch}
  />
  <FiSearch className="product-search-icon" />
</div>

<div className="cakes-grid">
  {/* Add Product Button */}
  <Link to="/admin/add-product" style={{ textDecoration: 'none' }}>
  <div className="add-product-card">
  
    <button className="add-product-button">
      + Add New Product
    </button>
  
</div>
</Link>


  {/* Cake Cards */}
  {cakes.map((cake) => (
    <div className="cakes-card" key={cake.id}>
      <div className="cakes-image">
        <Link to="/product">
          <img src={cake.image} alt={cake.name} />
        </Link>
        {cake.tag && <span className="cakes-tag">{cake.tag}</span>}
      </div>
      <div className="cakes-details">
        <h3 className="cakes-name">{cake.name}</h3>
        <p className="admin-cakes-price">
          <span className="cakes-price-span">from</span> Rs. {cake.price}
        </p>
        <div className="cakes-buttons">
        <Link to="/admin/edit-product" style={{ textDecoration: 'none' }}>
            <button className="cakes-view-button">Edit</button>
          </Link>
          <button className="cakes-delete-button">Delete Product</button>
        </div>
      </div>
    </div>
  ))}
</div>


      </div>
    </div>
  );
};

export default AdminHomePage;
