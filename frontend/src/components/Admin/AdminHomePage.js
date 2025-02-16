import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./AdminHomePage.css";
import cake1 from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"
import cake2 from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"
import { useAuthContext } from "../../hooks/useAuthContext";
import useNotify from "../../hooks/useNotify";

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
  const [products, setProducts] = useState([]);

  const {user} = useAuthContext();
  const {notify} = useNotify();

  const fetchProducts = async() =>{
    // e.preventDefault();
    try{
      const response = await fetch('http://localhost:3001/products/getallproducts');
      const json = await response.json();
      if(response.ok)
      {
        console.log(json)
        setProducts(json?.products)
      }
    }catch(error)
    {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(user?.userType === 'Admin')
    {
      fetchProducts();
    }
  },[user])

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products?.filter((product) =>
    product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleDelete = async(id) => {
    // setProducts(products.filter((product) => product.id !== id));
    try{
      const response = await fetch(`http://localhost:3001/products/deleteproduct/${id}`,{
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      })
      const json = await response.json();
      if(response.ok)
      {
        console.log(json)
        fetchProducts();
        notify("Successfully deleted the product", "success")
      }
    }catch(error)
    {
      console.log(error)
      notify("Error deleting the product", "error")
    }
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
  {/* Cake Cards */}
{filteredProducts?.map((cake) => (
  <div className="cakes-card" key={cake?._id}>
    <div className="cakes-image">
      <img src={`http://localhost:3001/uploads/${cake?.productImages[0]}`} alt={cake.name} />
      {cake?.bestseller === true && <span className="cakes-tag">Bestseller</span>}
    </div>
    <div className="cakes-details">
      <h3 className="cakes-name">{cake?.title}</h3>
      <p className="admin-cakes-price">
        <span className="cakes-price-span">from</span> Rs. {cake?.prices[0]?.price ? cake?.prices[0]?.price : cake?.defaultPrice}
      </p>
      <div className="cakes-buttons">
        <Link to={`/admin/edit-product/${cake?._id}`} style={{ textDecoration: 'none' }}>
          <button className="cakes-view-button">Edit</button>
        </Link>
        <button className="cakes-delete-button" onClick={() => handleDelete(cake?._id)}>Delete Product</button>
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
