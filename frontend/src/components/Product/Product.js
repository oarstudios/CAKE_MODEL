import React, { useEffect, useState } from "react";
import "./Product.css";
import cakeImage from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg"; // Replace with your actual image path
import { Link, useNavigate, useParams } from "react-router-dom";
import useNotify from "../../hooks/useNotify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ToastContainer } from "react-toastify";

const Product = ({ toggleCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [product, setProduct] = useState('')

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
 

  const {id} = useParams();

  const [mainImage, setMainImage] = useState();

  const fetchProduct = async()=>{    
    try{
      const response = await fetch(`http://localhost:3001/products/getproductbyid/${id}`);
      const json = await response.json();
      if(response.ok)
      {
        setProduct(json)
        setMainImage(json?.product?.productImages[0])
        setSelectedWeight(json?.product?.prices[0]?.weight)
        console.log(json);
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchProduct();
  },[])

  const {user} = useAuthContext();
  
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
      'productId': id,
      'quantity': quantity,
      'weight': selectedWeight,
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
const weight = selectedWeight;
const price = selectedPrice;

console.log(weight, price)

const handleBilling = (id) => {
  navigate(`/billing/${quantity}/${encodeURIComponent(weight)}/${price}/${id}`);
};


const handleWeightChange = (weight) => {
  setSelectedWeight(weight);

  // Find the price for the selected weight
  const matchingPrice = product?.product?.prices.find(
    (price) => price.weight === weight
  );
  
  setSelectedPrice(matchingPrice ? matchingPrice.price : 0);
};

useEffect(() => {
  if (product?.product?.prices?.length) {
    // Set initial weight and price
    setSelectedWeight(product.product.prices[0]?.weight);
    setSelectedPrice(product.product.prices[0]?.price);
  }
}, [product]);

  // console.log(mainImage)
  return (
    <>
    <div className="forcolor">
    <div className="product-container">
      <div className="product-image-section">
      <img src={`http://localhost:3001/uploads/${mainImage}`} alt="Main Product" className="main-image" />
              <div className="thumbnail-container">
          {product?.product?.productImages.map((image, index)=>(

          <img
          key={index}
          src={`http://localhost:3001/uploads/${image}`}
          alt={`Thumbnail ${index + 1}`}
          className="thumbnail"
          onClick={() => setMainImage(image)}
          style={{ cursor: "pointer", border: mainImage === image ? "2px solid #D5B26B" : "none" }} // Highlight selected image
          />
          ))}
        </div>
      </div>

      <div className="product-details-section">
        <h1 className="product-name">{product?.product?.title}</h1>
        <p className="product-price">Rs.  {selectedPrice}</p>
        <p className="product-description">
        {product?.product?.description}
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
            type="button"
              className={`weight-option ${selectedWeight === "1/2 KG" ? "selected" : ""}`}
              onClick={() => handleWeightChange("1/2 KG")}
            >
              1/2 KG
            </button>
            <button
            type="button"
              className={`weight-option ${selectedWeight === "1 KG" ? "selected" : ""}`}
              onClick={() => handleWeightChange("1 KG")}
            >
              1 KG
            </button>
            <button
            type="button"
              className={`weight-option ${selectedWeight === "2 KG" ? "selected" : ""}`}
              onClick={() => handleWeightChange("2 KG")}
            >
              2 KG
            </button>
          </div>
        </div>

        <div className="cotw-buttons">
          <button className="cotw-add-to-cart" onClick={(e)=>handleAddToCart(e)}>Add to Cart</button>
        
          <button className="cotw-buy-now" onClick={()=>handleBilling(product?.product?._id)}>Buy Now</button>
        </div>

          

          
        </div>
      </div>  
      
    </div>
    <hr className="cotw-divider" />
    {/* </div> */}
    {/* <hr className="cotw-divider" /> */}
    
    <ToastContainer/>
    </>
  );
};

export default Product;
