import React, { useState } from "react";
import "./MyAccount.css";
import cake from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1 (1).png";

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState({
    name: "Omkar Garate",
    email: "omkargarate116677@gmail.com",
    phone: "+91 99111 88822",
    age: 23,
    gender: "Male",
    address: {
      address: "",
      landmark: "",
      state: "",
      city: "",
      pinCode: "",
    },
  });

  const [orders] = useState([
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

  return (
    <div className="my-account-page">
  <div className="account-left">
    <div className="heading-row">
      <h2 className="heading">My Account</h2>
      <button className="edit-button">Edit</button>
    </div>
    <form className="account-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="********" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={userDetails.age}
            onChange={(e) =>
              setUserDetails({ ...userDetails, age: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            value={userDetails.gender}
            onChange={(e) =>
              setUserDetails({ ...userDetails, gender: e.target.value })
            }
          />
        </div>
      </div>
    </form>

    <div className="heading-row">
      <h2 className="heading">Address</h2>
      <button className="edit-button">Edit</button>
    </div>
    <form>
      <div className="different">
        <div className="delivery-grid">
          <input type="text" placeholder="First Name*" required />
          <input type="text" placeholder="Last Name*" required />
        </div>
        <div className="delivery-grid-2">
          <input type="text" placeholder="Address*" required />
          <input type="text" placeholder="Landmark" />
        </div>
        <div className="state-city-pincode">
          <input type="text" placeholder="State*" required />
          <input type="text" placeholder="City*" required />
          <input type="text" placeholder="PIN Code*" required />
        </div>
        <div className="phone-field">
          <input type="text" placeholder="Phone*" required />
        </div>
      </div>
    </form>

    <button className="logout-button">Logout</button>
  </div>

  <div className="account-right">
    <h2 className="heading">Orders</h2>
    {orders.map((order) => (
      <div className="order-item" key={order.id}>
        <img src={order.image} alt="Order" className="order-image" />
        <div className="order-details">
          <p className="order-date">{order.date}</p>
          <p className={`order-status ${order.status.toLowerCase()}`}>
            {order.status}
          </p>
          <p className="order-items">{order.items}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default MyAccount;
