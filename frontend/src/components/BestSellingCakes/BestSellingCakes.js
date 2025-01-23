import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./BestSellingCakes.css";
import cake1 from "../../images/cake1.jpg"
import cake2 from "../../images/cake1.jpg"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotify } from "../../hooks/useNotify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    id: 11,
    name: "Triple Chocolate Cheesecake",
    price: "2,200.00",
    image: cake1,
    tag: "Bestseller",
  },
  {
    id: 21,
    name: "Strawberry Chocolate",
    price: "1,600.00",
    image: cake2,
    tag: null,
  },
  {
    id: 31,
    name: "Chocolate Mousse",
    price: "1,800.00",
    image: cake1,
    tag: null,
  },
  {
    id: 10,
    name: "Triple Chocolate Cheesecake",
    price: "2,200.00",
    image: cake1,
    tag: "Bestseller",
  },
  {
    id: 20,
    name: "Strawberry Chocolate",
    price: "1,600.00",
    image: cake2,
    tag: null,
  },
  {
    id: 30,
    name: "Chocolate Mousse",
    price: "1,800.00",
    image: cake1,
    tag: null,
  },
  // Repeat more items to make 3 rows
];

const BestSellingCakes = () => {

  const {user} = useAuthContext();
  const location = useLocation(); 
  
  const {notify} = useNotify();
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
      console.log(user)
    }, 1000);
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
      'productId': "6790feef14a7c655bdab781d",
      'quantity': 1,
      'weight': 1
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
        <h2 className="section-title">Best Selling Cakes</h2>
        <div className="cake-grid">
          {cakes.map((cake) => (
            <div className="cake-card" key={cake.id}>
              <div className="cake-image">
                <Link to={`/product/678b9cd33c5c89b51736ef35`}>
                  <img src={cake.image} alt={cake.name} />
                </Link>
                {cake.tag && <span className="cake-tag">{cake.tag}</span>}
              </div>
              <div className="cake-details">
                <h3 className="cake-name">{cake.name}</h3>
                <p className="cake-price">
                  <span className="cake-price-span">from</span> Rs. {cake.price}
                </p>
                <div className="cake-buttons">
                  <button className="view-button">View</button>
                  <button className="add-button"  onClick={()=>handleAddToCart(cake)}>Add to Basket</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="section-line"></div>
      <ToastContainer />
    </>
  );
};

export default BestSellingCakes;
