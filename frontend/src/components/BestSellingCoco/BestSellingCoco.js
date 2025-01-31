import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./BestSellingCoco.css";
import cake1 from "../../images/cake1.jpg"
import cake2 from "../../images/cake1.jpg"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotify } from "../../hooks/useNotify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BestSellingCoco = () => {

  const {user} = useAuthContext();
  const location = useLocation(); 
  
  const {notify} = useNotify();
  const navigate = useNavigate();

  const [bsCakes, setBsCakes] = useState([])

  const fetchCakes = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/getallproducts`);
      const json = await response.json();
      
      console.log("API Response:", json); // Debugging Step
  
      if (response.ok) {
        if (Array.isArray(json.products)) {
          const filterBsCakes = json.products.filter(
            (cake) => cake.category === "Chocolate" 
            // && cake.bestseller === true
          );
  
          console.log("Filtered Cakes:", filterBsCakes);
          setBsCakes(filterBsCakes)
        } else {
          console.error("Expected an array but got:", typeof json);
        }
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };
  
  

  useEffect(()=>{
    setTimeout(() => {
      console.log(user)
    }, 1000);
    if(user)
    {
      fetchCakes();
    }
  },[user])

const updatedUserCart = async () => {
  if (!user) return showError();
  try {
    const response = await fetch(`http://localhost:3001/users/getuserbyid/${user?._id}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const updatedUser = await response.json();
    console.log('updated user', updatedUser)
    if (response.ok) {
      // setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify({token: user.token, user: updatedUser}));
      notify('Product added to cart', 'success')
      console.log("updt", user)
    }
  } catch (error) {
    console.error('Failed to update user cart:', error);
  }
};

const showError = ()=>{
  notify('Login in to add to basket', "error")
  navigate('/signin')
}

const handleAddToCart = async (product) => {
    
  try {
    if(!user)
      {

      return showError();
      // navigate('/signin')
      // return;
      }else{
        console.log(user._id)
      }

    const formData = {
      'productId': product._id,
      'quantity': 1,
      'weight': "1/2 KG",
      'price': product?.prices[0]?.price
    }
    console.log(formData) 
    
    const response = await fetch(`http://localhost:3001/users/addtocart/${user?._id}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if (response.ok) {
      console.log('successfully added to the basket', json);
      // notify('Added to the cart', "success");
      updatedUserCart()
      console.log('adt user', user);
    } else {
      console.log('Failed to add to basket', json);
      notify('Failed to add to basket', "error");
      
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

  return (
    <>
      <section className="best-selling-cakes">
        <h2 className="section-title">Best Selling Chocolates</h2>
        <div className="cake-grid">
          {bsCakes?.length > 0 ? (bsCakes?.map((cake) => (
            <div className="cake-card" key={cake?._id}>
              <div className="cake-image">
                <Link to={`/product/${cake?._id}`}>
                  <img src={`http://localhost:3001/uploads/${cake?.productImages[0]}`} alt={cake.name} />
                </Link>
                {cake?.bestseller === true && <span className="cake-tag">Bestseller</span>}
              </div>
              <div className="cake-details">
                <h3 className="cake-name">{cake?.title}</h3>
                <p className="cake-price">
                  <span className="cake-price-span">from</span> Rs. {cake?.prices[0]?.price}
                </p>
                <div className="cake-buttons">
                  <button className="view-button">View</button>
                  <button className="add-button"  onClick={()=>handleAddToCart(cake)}>Add to Basket</button>
                </div>
              </div>
            </div>
          ))): (
            <>
          <p></p>
          <p>No product found</p>
          <p></p>
          </>
          )}
        </div>
      </section>
      <div className="section-line"></div>
      <ToastContainer />
    </>
  );
};

export default BestSellingCoco;
