import React, { useEffect, useState } from "react";
import "./CakeOfTheWeek.css";
import cakeImage from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"; // Replace with the correct path to your cake image
import { useAuthContext } from "../../hooks/useAuthContext";
import useNotify from "../../hooks/useNotify";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const CakeOfTheWeek = ({ toggleCart }) => {
  const [quantity, setQuantity] = useState(1);
  // const navigate = useNavigate(); 

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const {user} = useAuthContext();
  
  const [ctw, setCtw] = useState(null)
  const [prd, setPrd] = useState(null)
  
    const fetchCakes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/ctw/getallctw`);
        const json = await response.json();
        
        console.log("API Response:", json); // Debugging Step
    
        if (response.ok) {
          setPrd(json)

        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/getproductbyid/${prd[0]?.product}`);
        const json = await response.json();
        
        console.log("API Response:", json); // Debugging Step
    
        if (response.ok) {
          setCtw(json)
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };


    useEffect(() => {
      // if (user) {
        fetchCakes();
      // }
    }, []); // Fetch cakes only when user is available
    
    useEffect(() => {
      if (prd && prd.length > 0) {
        fetchProduct();
      }
    }, [prd]); // Fetch product only when prd is updated
    

    const {notify} = useNotify();
  const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState(0);

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
      // navigate('/signin')
    }
    
    const handleAddToCart = async (e) => {
        e.preventDefault();
      try {
        if(!user)
          {
    
          return showError();
          // navigate('/signin')
          // return;
          }else{
            console.log(user._id)
          }
    
          // 678b9cd33c5c89b51736ef35
          // 67863b19bbf3cf5b04a2d017
    
        const formData = {
          'productId': ctw?.product?._id,
          'quantity': quantity,
          'weight': "1/2 KG",
          'price': selectedPrice
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
    const weight = "1/2 KG";
    const price = ctw?.product?.prices[0]?.price;
    
    console.log(weight, price)
    
    const handleBilling = (id) => {
      navigate(`/billing/${quantity}/${encodeURIComponent(weight)}/${price}/${id}`);
    };


  const handleBuyNow = () => {
    navigate("/billing"); // Navigate to the billing page
  };

  return (
    <>
    <section className="cotw-section">
    {/* Heading placed above everything */}
    <h2 className="cotw-heading">Cake of the Week</h2>
  
    {/* Content below heading */}
    <div className="cotw-card">
      <div className="cotw-image">
        <img src={`http://localhost:3001/uploads/${ctw?.product?.productImages[0]}`} alt="Triple Chocolate Cheesecake" />
      </div>
      <div className="cotw-details">
        <h3 className="cotw-name">{ctw?.product?.title}</h3>
        <p className="cotw-price">
          from <span>Rs. {ctw?.product?.prices[0]?.price}</span>
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
          <button className="cotw-add-to-cart" onClick={(e)=>handleAddToCart(e)}>Add to Cart</button>
          <button className="cotw-buy-now" onClick={()=>handleBilling(ctw?.product?._id)}>Buy Now</button>
        </div>
      </div>
    </div>
  </section>
    <ToastContainer/>
    </>
  );
};

export default CakeOfTheWeek;
