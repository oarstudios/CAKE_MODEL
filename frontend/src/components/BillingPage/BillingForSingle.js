import React, { useEffect, useState } from "react";
import "./BillingPage.css";
import cake from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg";
import removeIcon from "../../images/remove-icon.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Razorpay from 'razorpay'
import { useNotify } from "../../hooks/useNotify";

const BillingForSingle = () => {
  const { user } = useAuthContext();
  const {quantity, weight, id} = useParams();
  // console.log(quantity)
  const [adtItems, setAdtItems] = useState('');
  const [cartItems, setCartItems] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [landmark, setLandmark] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email2, setEmail2] = useState();
  const [firstName2, setFirstName2] = useState();
  const [lastName2, setLastName2] = useState();
  const [address2, setAddress2] = useState();
  const [landmark2, setLandmark2] = useState();
  const [state2, setState2] = useState();
  const [city2, setCity2] = useState();
  const [pincode2, setPincode2] = useState();
  const [phoneNo2, setPhoneNo2] = useState();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("cart", user?.cart);
  // }, [user]);

  const fetchData = async () => {
    if (user) {
      const response = await fetch(
        `http://localhost:3001/users/getuserbyid/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        // setAdtItems(json?.cart);
        // console.log(json)
        setFirstName(json?.address?.firstName);
        setLastName(json?.address?.lastName);
        setAddress(json?.address?.address);
        setLandmark(json?.address?.landmark);
        setState(json?.address?.state);
        setCity(json?.address?.city);
        setPincode(json?.address?.pincode);
        setPhoneNo(json?.phoneNo);
        setEmail(json?.email);
      }
    }
  };

  useEffect(() => {
    if(user)
    {

      fetchData();
    }
  }, [user]);

 

  // Use another useEffect to monitor cartItems changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        
          const response = await fetch(
            `http://localhost:3001/products/getproductbyid/${id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )

          const json = await response.json();
       
          if(response.ok)
          {
            console.log(json)
            setAdtItems(json)
          } 

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

  

    // console.log('products', cartItems)
    if(user)
      {
        fetchData();
       
  
      }

  }, [user]);

  useEffect(()=>{
    console.log(adtItems)
  },[adtItems])

  
  const handleRemove = async (id) => {
    // const updatedCartItems = cartItems.filter((item) => item.id !== id);
    // setCartItems(updatedCartItems);
    // console.log(id)

    try {
      const formData = {
        productId: id,
      };
      console.log(formData);

      const response = await fetch(
        `http://localhost:3001/users/removefromcart/${user?._id}`,
        {
          method: "DELETE",
          body: JSON.stringify(formData),
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (response.ok) {
        console.log("successfully removed from the cart", json);
        // updateUserCart()
        notify("Removed from bakset", "success")
        fetchData();
        console.log("adt user", user);
      } else {
        console.log("Failed to remove from cart", json);
        notify("Failed to remove from basket", "error")
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const subtotal = adtItems?.product?.price * quantity;

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
  //     name: "Triple Chocolate Cheesecake - Eggless",
  //     price: 2500,
  //     quantity: 1,
  //     image: cake,
  //   },
  // ]);

  const [differentBillingAddress, setDifferentBillingAddress] = useState(false);

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleBillSubmit = async () => {
    try {
      const formData = {
        email,
        productIds: [{
          product: id,
          quantity,
          weight
        }],
        shippingAddress: {
          firstName,
          lastName,
          address,
          landmark,
          state,
          city,
          pincode,
          phoneNo
        },
        billingAddress: {
          firstName2: firstName2,
          lastName2: lastName2,
          address2: address2,
          landmark2: landmark2,
          state2: state2,
          city2: city2,
          pincode2: pincode2,
          phoneNo2: phoneNo2
        },
      };
  
      // If the billing address is the same as the shipping address, copy the shipping address to billing address
      // if (!differentBillingAddress) {
      //   formData.billingAddress = { ...formData.shippingAddress }; // Ensure billing address is the same as shipping
      // }
  
      const response = await fetch(`http://localhost:3001/billing/${user?._id}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const json = await response.json();
  
      if (response.ok) {
        console.log(json);
        notify('Order successfully placed', "success");
        setTimeout(() => {
          navigate('/my-account');
        }, 1000);
      }
  
      console.log("formData", formData);
    } catch (error) {
      console.log(error);
    }
  };
  
  const [pay, setPay] = useState();
  const {notify} = useNotify();
  


   //PAYMENT GATEWAY

   const paymentHandler = async(e) =>{
    e.preventDefault();

    

    // const productDataArray = cartItems.map(item => ({
    //   product: item.productDetails.product._id,
    //   quantity: item.quantity // Include the quantity for each product
    // }));

    //   if (productDataArray.length === 0) {
    //     // notify('No product data to submit.',"info");
    //     console.log("No product data to submit.")

    //     return;
    //   }
    const data = {
      productIds: id, // Changed from productIds to productData
      firstName: firstName,
      lastName: lastName,
      country: 'INDIA',
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      phoneNumber: phoneNo,
      email: email,
      totalPrice: subtotal,
      status: 'Order Placed'
    };

    if(!data?.firstName || !data?.lastName || !data?.country || !data?.address || !data?.city || !data?.state || !data?.pincode || !data?.phoneNumber || !data?.email || !data?.status)
      {
        return setPay(false)
      }
    const amount= subtotal * 100;
    const currency= "INR";
    const receipt = "abcdef"
    const response = await fetch('http://localhost:3001/order',{
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const order = await response.json();
    console.log('payment', order)

    var options = {
      "key": "rzp_test_q34DaePkfJ8UeT", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "Acme Corp", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.order?.id, 
      "handler": async function(response){
        const body = {
          ...response, 
        }

        const validateRes = await fetch('http://localhost:3001/order/validate',{
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        
    
        // Prepare the data object for the request
        

        const json = await validateRes.json()
        if(validateRes.ok)
        {
          try{
            await handleBillSubmit();
            
          }catch(error)
          {
            console.log('Error:', error);
          }
        }
        console.log(json)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
      rzp1.open();
      // e.preventDefault();
  
  }
  

  return (
    <div className="billing-page">
      <div className="billing-left">
        <form onSubmit={(e) => paymentHandler(e)}>
          <div className="contact-header">
            <h2 className="heading-billing-h2">Contact</h2>
            {/* <a href="/signin" className="log-in">
              Log In
            </a> */}
          </div>
          <div className="different">
            <input
              type="email"
              placeholder="Email"
              readOnly
              value={email}
              required
            />

            <h2 className="heading-billing-h2">Delivery</h2>
            <div className="delivery-grid">
              <input
                type="text"
                placeholder="First Name*"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
              <input
                type="text"
                placeholder="Last Name*"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>

            <div className="delivery-grid-2">
              <input
                type="text"
                placeholder="Address*"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
              <input
                type="text"
                placeholder="Landmark*"
                onChange={(e) => setLandmark(e.target.value)}
                value={landmark}
                required
              />
            </div>

            <div className="state-city-pincode">
              <input
                type="text"
                placeholder="State*"
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
              />
              <input
                type="text"
                placeholder="City*"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              />
              <input
                type="text"
                placeholder="PIN Code*"
                onChange={(e) => setPincode(e.target.value)}
                value={pincode}
                required
              />
            </div>
            <div className="phone-field">
              <input
                type="text"
                placeholder="Phone*"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
                required
              />
            </div>
          </div>

          <h2 className="heading-billing-h2">Billing Address</h2>
          <div className="billing-options">
            <label
              className={
                !differentBillingAddress
                  ? "radio-option selected"
                  : "radio-option"
              }
            >
              <input
                type="radio"
                name="billingAddress"
                checked={!differentBillingAddress}
                onChange={() => setDifferentBillingAddress(!differentBillingAddress)}
              />
              Same as shipping Address
            </label>
            <label
              className={
                differentBillingAddress
                  ? "radio-option selected"
                  : "radio-option"
              }
            >
              <input
                type="radio"
                name="billingAddress"
                checked={differentBillingAddress}
                onChange={() => setDifferentBillingAddress(true)}
              />
              Use a different billing Address
            </label>
          </div>

          {differentBillingAddress && (
            <div className="billing-address-fields">
              <div className="delivery-grid">
                <input
                  type="text"
                  placeholder="First Name*"
                  required
                  className="form-field"
                  onChange={(e) => setFirstName2(e.target.value)}
                  value={firstName2}
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  required
                  className="form-field"
                  onChange={(e) => setLastName2(e.target.value)}
                  value={lastName2}
                />
              </div>

              <div className="delivery-grid-2">
                <input
                  type="text"
                  placeholder="Address*"
                  required
                  className="form-field"
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                />
                <input
                  type="text"
                  placeholder="Landmark*"
                  required
                  className="form-field"
                  onChange={(e) => setLandmark2(e.target.value)}
                  value={landmark2}
                />
              </div>

              <div className="state-city-pincode">
                <input
                  type="text"
                  placeholder="State*"
                  required
                  className="form-field"
                  onChange={(e) => setState2(e.target.value)}
                  value={state2}
                />
                <input
                  type="text"
                  placeholder="City*"
                  required
                  className="form-field"
                  onChange={(e) => setCity2(e.target.value)}
                  value={city2}
                />
                <input
                  type="text"
                  placeholder="PIN Code*"
                  required
                  className="form-field"
                  onChange={(e) => setPincode2(e.target.value)}
                  value={pincode2}
                />
              </div>

              <div className="phone-field">
                <input
                  type="text"
                  placeholder="Phone*"
                  required
                  className="form-field"
                  onChange={(e) => setPhoneNo2(e.target.value)}
                  value={phoneNo2}
                />
              </div>
            </div>
          )}

          <button className="pay-now" type="submit">
            Pay Now
          </button>
        </form>
      </div>

      <div className="billing-right">
        <div className="cart-items">
          {/* {cartItems.length > 0 && ( */}
            {/* <> */}
              <div className="cart-header">
                <span>PRODUCT</span>
                <span>QUANTITY</span>
              </div>
              <div className="cart-items">
                {/* {cartItems.map((item) => ( */}
                  <div className="cart-item" key={adtItems?.product?._id}>
                    <div className="cart-product-info">
                      <img
                        src={adtItems?.image}
                        alt={adtItems?.name}
                        className="cart-product-image"
                      />
                      <div className="cart-product-details">
                        <p className="cart-product-name">
                          {adtItems?.product?.title}
                        </p>
                        <p className="cart-product-price">
                          Rs {adtItems?.product?.price}
                        </p>
                      </div>
                    </div>
                    <div className="quantity-info">
                      <p className="quantity">x {quantity}</p>
                    </div>
                    {/* <div className="remove-item">
                      <img
                        src={removeIcon}
                        alt="Remove"
                        className="remove-icon"
                        onClick={() =>
                          handleRemove(adtItems?.productDetails?.product?._id)
                        }
                      />
                    </div> */}
                  </div>
                {/* // ))} */}
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
                onClick={() => navigate("/billing")}
              >
                Proceed to Checkout
              </button>
            {/* </> */}
          {/* // )} */}
        </div>
        <div className="summary">
          <div className="summary-item">
            <span className="shipping-heading">Shipping</span>
            <span className="shipping-rates">Free</span>
          </div>
          <div className="summary-item">
            <span className="shipping-total-heading">Total</span>
            <span className="shipping-total-amount">Rs {subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForSingle;
