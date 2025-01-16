import React, { useState } from "react";
import "./AdminOrders.css";
import img1 from "../../images/american-heritage-chocolate-5K5Nc3AGF1w-unsplash 1 (1).png";

const AdminOrders = () => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;

  const orders = [
    {
      id: "#000001",
      productName: "Dutch Chocolate Truffle Cake",
      address: "501, Elita Apartments, Sector 6, Plot 22, Kamohe, Navi Mumbai, 410209",
      date: "21/12/2024",
      price: "2500",
      status: "Delivered",
      customer: {
        name: "Omkar Garate",
        customerId: "#000111",
        contact: "+91 99888 77666",
        email: "garateomkar89765432875@gmail.com",
        paymentMethod: "Cash on Delivery",
      },
      orderDetails: [
        { id: 1, name: "Triple Chocolate Cheesecake - Eggless", quantity: 2, image: img1 },
        { id: 2, name: "Triple Chocolate Cheesecake - Eggless", quantity: 2, image: img1 }
      ],
    },
    {
      id: "#000002", // Unique ID
      productName: "Black Forest Cake",
      address: "601, Pearl Heights, Lokhandwala, Mumbai, 400053",
      date: "22/12/2024",
      price: "1800",
      status: "Pending",
      customer: {
        name: "Aarav Patel",
        customerId: "#000222",
        contact: "+91 99888 12345",
        email: "aaravpatel89765432875@gmail.com",
        paymentMethod: "Online Payment",
      },
      orderDetails: [
        { id: 1, name: "Red Velvet Cupcake", quantity: 4, image: img1 },
      ],
    },
    {
      id: "#000003", // Unique ID
      productName: "Vanilla Bean Cake",
      address: "103, Ocean Breeze Apartments, Andheri West, Mumbai, 400058",
      date: "23/12/2024",
      price: "1500",
      status: "Canceled",
      customer: {
        name: "Isha Kapoor",
        customerId: "#000333",
        contact: "+91 88777 55666",
        email: "ishakapoor89765432875@gmail.com",
        paymentMethod: "Cash on Delivery",
      },
      orderDetails: [
        { id: 1, name: "Blueberry Cheesecake Slice", quantity: 3, image: img1 },
      ],
    },
  ];



  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const toggleOrderDetails = (orderId) => {
    setActiveOrder(activeOrder === orderId ? null : orderId);
  };

  const paginateOrders = (orders, currentPage, ordersPerPage) => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return orders.slice(startIndex, startIndex + ordersPerPage);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveOrder(null); // Close active order when switching pages
  };

  return (
    <div className="admin-orders">
      <div className="orders-navigation">
        <button className="active">All Orders</button>
        <button>Completed</button>
        <button>Pending</button>
        <button>Canceled</button>
      </div>

      <div className="orders-list">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginateOrders(orders, currentPage, ordersPerPage).map(
              (order, index) => (
                <React.Fragment key={order.id}>
                  <tr
                    onClick={() => toggleOrderDetails(order.id)}
                    className={`order-row ${
                      activeOrder === order.id ? "active-order" : ""
                    }`}
                  >
                    <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td>
                    <td>{order.id}</td>
                    <td>{order.productName}</td>
                    <td>{order.address}</td>
                    <td>{order.date}</td>
                    <td>{order.price}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                  {activeOrder === order.id && (
  <tr className={`order-details-row ${activeOrder === order.id ? "active-order-details" : ""}`}>
    <td colSpan="7">
      <div className="order-details">
        <div className="customer-details">
          <h3>Customer Details</h3>
          <p>Name: {order.customer.name}</p>
          <p>Customer ID: {order.customer.customerId}</p>
          <p>Contact: {order.customer.contact}</p>
          <p>Email: {order.customer.email}</p>
          <p>
            <strong>Payment Method:</strong> {order.customer.paymentMethod}
          </p>
        </div>
        <div className="order-items">
          <h3>Order Details</h3>
          {order.orderDetails.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} className="cake-image" />
              <span>{item.name}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="update-status">
          <h3>Update Order Status</h3>
          <button className="Pending">Pending</button>
          <button className="Delivered">Delivered</button>
          <button className="Canceled">Canceled</button>
        </div>
      </div>
    </td>
  </tr>
)}

                </React.Fragment>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          Showing {ordersPerPage * (currentPage - 1) + 1} -{" "}
          {Math.min(ordersPerPage * currentPage, orders.length)} of{" "}
          {orders.length} Orders
        </span>
        <button
          className={`pagination-btn ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`pagination-btn ${
              currentPage === i + 1 ? "active-page" : ""
            }`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`pagination-btn ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
