import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import "./MyAccount.css";
import cake from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg";
import {useLogout} from '../../hooks/useLogout'
import useNotify from "../../hooks/useNotify";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const MyAccount = () => {
  const {logout} = useLogout();
  const {notify} = useNotify()
  const navigate = useNavigate();
  const {user, dispatch} = useAuthContext();
  console.log(user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState()
  const [gender, setGender] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [landmark, setLandmark] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [phoneNo, setPhoneNo] = useState()
  const [edit1, setEdit1] = useState(false)
  const [edit2, setEdit2] = useState(false)

  

  useEffect(()=>{
    console.log(user)
    setUsername(user?.username)
    // setPassword(user?.password)
    setAge(user?.age)
    setGender(user?.gender)
    setFirstName(user?.address?.firstName)
    setLastName(user?.address?.lastName)
    setAddress(user?.address?.address)
    setLandmark(user?.address?.landmark)
    setState(user?.address?.state)
    setCity(user?.address?.city)
    setPincode(user?.address?.pincode)
    setPhoneNo(user?.phoneNo)
  },[user])

  const handleLogout = ()=>{
    try{
      logout();
      notify("Successfully logged out.", "success")
      console.log("Successfully logged out.")
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }catch(error){
      console.log(error)
      notify(error, "error")
    }
  }

  const [orders2] = useState([
    {
      id: 1,
      date: "5th Jan 2025",
      status: "Pending",
      items: "Triple Chocolate Cheesecake x2, Chocolate cupcakes x5",
      image: cake,
    },
    {
      id: 2,
      date: "25th Dec 2024",
      status: "Delivered",
      items: "Triple Chocolate Cheesecake x2, Chocolate cupcakes x5",
      image: cake,
    },
  ]);

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];
    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const formData = {
          username,
          password,
          age,
          gender,
          firstName,
          lastName,
          address: {
            firstName,
            lastName,
            address,
            landmark,
            state,
            city,
            pincode,
          },
          phoneNo
        }

        const response = await fetch(`http://localhost:3001/users/updateuser/${user?._id}`,{
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })

        const json = await response.json();

        if(response.ok)
        {
          console.log(json)
          localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
          notify("Data updated successfully", "success")
        }
      }catch(error){
        console.log(error)
        notify("Error updating data", "error")
      }
    }


    const [orders, setOrders] = useState([])
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
    
      // Get day, month, and year
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
    
      // Function to add suffix to the day
      const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
          case 1: return `${day}st`;
          case 2: return `${day}nd`;
          case 3: return `${day}rd`;
          default: return `${day}th`;
        }
      };
    
      return `${getDaySuffix(day)} ${month} ${year}`;
    };  

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/billing/`);
        const json = await response.json();
    
        // Log the response to check its structure
        console.log("billings",json);
    
        if (Array.isArray(json.data)) {
          const filterOrders = json.data.filter(
            (or) => or?.userId?._id && or.userId._id === user?._id
          );
    
          // Fetch products for the first 2 items
          const productPromises = filterOrders.map((item) => {
            const productFetches = item?.productIds?.slice(0, 2).map((productId) =>
              fetch(
                `http://localhost:3001/products/getproductbyid/${productId?.product?._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              )
                .then((response) => response.json())
                .catch((error) => {
                  console.error("Product fetch error:", error);
                  return null; // Return null if the fetch fails
                })
            );
    
            return Promise.all(productFetches);
          });
    
          const products = await Promise.all(productPromises);
    
          const ordersWithDetails = filterOrders.map((order, index) => {
            return {
              ...order,
              products: products[index].map((product, idx) => ({
                name: product?.product?.title,
                quantity: order.productIds[idx]?.quantity,
                image: product?.image, // Assuming `image` is part of the product response
              })),
              billingTime: formatDate(order?.createdAt),
              status: order.status,
            };
          });
    
          // Sort the orders based on billingTime in descending order
          const sortedOrders = ordersWithDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
          setOrders(sortedOrders);
          console.log("order", sortedOrders);
        } else {
          console.log("Returned data is not an array:", json);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
  
    useEffect(() => {
      if (user) {
        fetchOrders();
        console.log("ord", user?.password === "")
      }
    }, [user]);
    
    


  return (
    <div className="my-account-page">
      {/* Account Section */}
      <div className="account-left">
        <div className="heading-row">
          <h2 className="heading">My Account</h2>
          {!edit1 &&
          <button className="edit-button" onClick={()=>setEdit1(!edit1)}>Edit</button>}
        </div>
        <form className="account-form" onSubmit={(e)=>handleSubmit(e)}>
          {/* Name Input */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                readOnly= {!edit1}
              />
            </div>
          </div>

          {/* Email and Password */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={user?.email}
                
                readOnly
              />
            </div>
            {user?.password?.length > 0 && (
  <div className="form-group">
    <label htmlFor="password">Set new password</label>
    <input
      type="password"
      id="password"
      placeholder="********"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      readOnly={!edit1}
    />
  </div>
)}

          </div>

          {/* Age and Gender */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                readOnly= {!edit1}
                onChange={(e) =>
                  setAge(e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
  required
  className="state-input"
  onChange={(e) => setGender(e.target.value)}
  value={gender}
  style={{ pointerEvents: edit1 ? 'auto' : 'none' }} // Only allow interaction when edit1 is true
>
  <option value="">Select Gender*</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Others">Others</option>
</select>

              {/* <input
                type="text"
                id="gender"
                value={gender}
                readOnly= {!edit1}
                onChange={(e) =>
                  setGender(e.target.value)
                }
              /> */}
            </div>
          </div>
          <div className="sbBtn">

<button className="submit" type="submit" style={{display: edit1? "block": "none"}} onClick={()=>setEdit1(!edit1)}>Submit</button>
</div>
        </form>

        {/* Address Section */}

        {user?.userType === 'User' && (
          <>
          <div className="heading-row">
          <h2 className="heading">Address</h2>
          {!edit2 && 
          <button className="edit-button" onClick={()=>setEdit2(!edit2)}>Edit</button> }
        </div>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="different">
            <div className="delivery-grid">
              <input type="text" placeholder="First Name*" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required readOnly={!edit2}/>
              <input type="text" placeholder="Last Name*" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required readOnly={!edit2}/>
            </div>
            <div className="delivery-grid-2">
              <input type="text" placeholder="Address*" value={address} onChange={(e)=>{setAddress(e.target.value)}} required readOnly={!edit2}/>
              <input type="text" placeholder="Landmark" value={landmark} onChange={(e)=>{setLandmark(e.target.value)}} readOnly={!edit2}/>
            </div>
            <div className="state-city-pincode">
              <select required className="state-input" onChange={(e)=>{setState(e.target.value)}} value={state} style={{ pointerEvents: edit2 ? 'auto' : 'none' }} >
                <option value="">Select State*</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {/* <input type="text" placeholder="City*" required /> */}
              {/* <input type="text" placeholder="PIN Code*" required /> */}
              {/* <input type="text" placeholder="State*" value={state} onChange={(e)=>{setState(e.target.value)}} required readOnly={!edit2}/> */}
              <input type="text" placeholder="City*" value={city} onChange={(e)=>{setCity(e.target.value)}} required readOnly={!edit2}/>
              <input type="text" placeholder="PIN Code*" value={pincode} onChange={(e)=>{setPincode(e.target.value)}} required readOnly={!edit2}/>
            </div>
            <div className="phone-field">
              <input type="text" placeholder="Phone*" value={phoneNo} onChange={(e)=>{setPhoneNo(e.target.value)}} required readOnly={!edit2}/>
            </div>
          </div>
          <div className="sbBtn">

<button className="submit" type="submit" onClick={()=>setEdit2(!edit2)} style={{display: edit2? "block": "none"}}>Submit</button>
</div>
        </form>
          </>
        )}
        

        <button className="logout-button"  onClick={handleLogout}>Logout</button>
      </div>

      {/* Orders Section */}
     {/* Orders Section */}

     {user?.userType === 'User' && (
      <div className="account-right">
  <h2 className="heading">Orders</h2>
  {orders.map((order) => (
    <Link to={`/order/${order._id}`} key={order._id} className="orders-link">
      <div className="orders-item">
        <img src={cake} alt="Order" className="orders-image" />
        <div className="orders-details">
          <p className="orders-date">{order.billingTime}</p>
          <p className={`orders-status ${order.status.toLowerCase()}`}>
            {order.status}
          </p>
          {order?.products?.map((prd, index) => {
            return ( // Adding a return statement here to render the name properly
              <span key={index} className="orders-items">
                {prd?.name} x{prd?.quantity} {/* Display product name with quantity */}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  ))}
</div>
     )}


      <ToastContainer/>
    </div>
  );
};

export default MyAccount;
