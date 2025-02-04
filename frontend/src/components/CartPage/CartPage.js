import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";
import removeIcon from "../../images/remove-icon.png";
import cake from "../../images/cake1.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";

const CartPage = () => {

  const {user} = useAuthContext(); 
  const [adtItems, setAdtItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log("cart",user?.cart)
  },[user])

  const fetchData = async () => {
    if (user) {
      const response = await fetch(`http://localhost:3001/users/getuserbyid/${user?._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAdtItems(json?.cart);
      }
    }
  };

useEffect(() => {
  
  fetchData();
  console.log(adtItems)
}, [user]);

// Use another useEffect to monitor cartItems changes
useEffect(() => {
  const fetchData = async () => {
    try {
      const productPromises = adtItems.map(item => 
        fetch(`http://localhost:3001/products/getproductbyid/${item.product}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        }).then(response => response.json())
      );

      const products = await Promise.all(productPromises);
     
      // setCartItems(products)
      
      // Assuming you want to set the fetched products in the cart items
      const updatedCartItems = products.map((product, index) => ({
        ...adtItems[index],
        productDetails: product // Adding product details to each cart item
      }));



      setCartItems(updatedCartItems);
      
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // console.log('products', cartItems)

  if (adtItems && adtItems.length > -1) {
    fetchData();
    console.log('adtItems', cartItems)
  }
}, [adtItems, user]);

const handleRemove = async(id) => {
  // const updatedCartItems = cartItems.filter((item) => item.id !== id);
  // setCartItems(updatedCartItems);
  // console.log(id)

  try {
    const formData = {
      'productId': id
    }
    console.log(formData)
    
    const response = await fetch(`http://localhost:3001/users/removefromcart/${user?._id}`, {
      method: "DELETE",
      body: JSON.stringify(formData),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const json = await response.json();
    if (response.ok) {
      console.log('successfully removed from the cart', json);
      // updateUserCart()
      fetchData();
      console.log('adt user', user);
    } else {
      console.log('Failed to remove from cart', json);
    }
  } catch (error) {
    console.log('Error:', error);
  }
};
  

  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Triple Chocolate Cheesecake - Eggless",
  //     price: 2500,
  //     quantity: 2,
  //     image: cake,
  //   },
  //   {
  //     id: 2,
  //     name: "Classic Vanilla Cheesecake - Eggless",
  //     price: 2500,
  //     quantity: 1,
  //     image: cake,
  //   },
  // ]);

  const [isMobile, setIsMobile] = useState(false); // Detect mobile view
  // const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item?.price * item?.quantity, 0
  );
  useEffect(() => {
    // Check if the device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Update the breakpoint as needed
    };
    checkIsMobile();

    // Listen for screen resize
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };

    
  }, []);

  // useEffect(()=>{
  //   console.log(subtotal);
  // },[subtotal])


  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="cart-container">
        {/* Show 'Go Back' button on mobile */}
        {isMobile && (
          <button className="go-back-button" onClick={() => navigate(-1)}>
            &larr;
          </button>
        )}
  
        <h1 className="cart-title">Cart</h1>
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header">
              <span>PRODUCT</span>
              <span>QUANTITY</span>
            </div>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  {console.log(cartItems)}
                  <div className="cart-product-info">
                    <img
                      src={`http://localhost:3001/uploads/${item?.productDetails?.product?.productImages[0]}`}
                      alt={item.name}
                      className="cart-product-image"
                    />
                    <div className="cart-product-details">
                      <Link to={`/product/${item?.productDetails?.product?._id}`} className="cart-product-name">
                        {item?.productDetails?.product?.title}
                      </Link>
                      <p className="cart-product-price">
                        Rs {item?.price}
                      </p>
                    </div>
                  </div>
                  <div className="quantity-info">
                    <p className="quantity">x {item?.quantity}</p>
                  </div>
                  <div className="remove-item">
                    <img
                      src={removeIcon}
                      alt="Remove"
                      className="remove-icon"
                      onClick={() =>
                        handleRemove(item?.productDetails?.product?._id)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-header">
                <p className="summary-title">Details</p>
                <p className="summary-title">Subtotal</p>
              </div>
              <div className="summary-body">
                <p className="summary-text">
                  Including Taxes* <br /> Shipping Calculated at Checkout*
                </p>
                <p className="subtotal-amount">Rs {subtotal}</p>
              </div>
            </div>
            <button
              className="cotw-buy-now"
              onClick={() => {
                // closeCart();
                navigate("/billing");
              }}
            >
              Proceed to Checkout
            </button>
          </>
        ) : (
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>
            {user ? (
              <p>Add items to your cart to view them here.</p>
            ) : (
              <p>
                Please <Link to={"/signin"}>Log in</Link> to add products.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
  
};


export default CartPage;
