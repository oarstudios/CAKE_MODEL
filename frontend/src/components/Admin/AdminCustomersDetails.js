import React, { useState, useEffect } from "react";
import "./AdminOrders.css";
import "./AdminCustomersDetails.css";
import AdminCustDetMobile from "./AdminCustDetMobile"; // Importing the mobile version

const AdminCustomersDetails = () => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false); // State to detect mobile view
  const ordersPerPage = 15;

  const orders = [
    {
      id: "#000001",
      name: "Dutch Chocolate Truffle Cake",
      address:
        "501, Elita Apartments, Sector 6, Plot 22, Kamohe, Navi Mumbai, 410209",
      totalSpent: "21/12/2024",
      orders: "25",
      customer: {
        name: "Omkar Garate",
        customerId: "#000111",
        contact: "+91 99888 77666",
        email: "garateomkar89765432875@gmail.com",
        gender: "Male",
        age: "50",
      },
    },
    {
      id: "#000002",
      name: "Black Forest Cake",
      address: "601, Pearl Heights, Lokhandwala, Mumbai, 400053",
      totalSpent: "22/12/2024",
      orders: "25",
      customer: {
        name: "Aarav Patel",
        customerId: "#000222",
        contact: "+91 99888 12345",
        email: "aaravpatel89765432875@gmail.com",
        gender: "Male",
        age: "50",
      },
    },
    {
      id: "#000003",
      name: "Vanilla Bean Cake",
      address: "103, Ocean Breeze Apartments, Andheri West, Mumbai, 400058",
      totalSpent: "23/12/2024",
      orders: "25",
      customer: {
        name: "Isha Kapoor",
        customerId: "#000333",
        contact: "+91 88777 55666",
        email: "ishakapoor89765432875@gmail.com",
        gender: "Male",
        age: "50",
      },
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
    setActiveOrder(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="admin-orders">
      {isMobile ? (
        <AdminCustDetMobile
          orders={orders}
          currentPage={currentPage}
          ordersPerPage={ordersPerPage}
        />
      )  : (
        // Render Desktop Version
        <>
          <div className="orders-list">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Address</th>
                  <th>Total Spent</th>
                  <th>No. of Orders</th>
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
                        <td>{order.name}</td>
                        <td>{order.address}</td>
                        <td>{order.totalSpent}</td>
                        <td>{order.orders}</td>
                      </tr>
                      {activeOrder === order.id && (
                        <tr
                          className={`order-details-row ${
                            activeOrder === order.id
                              ? "active-order-details"
                              : ""
                          }`}
                        >
                          <td colSpan="6">
                            <div className="admin-order-details">
                              <div className="admin-customer-details">
                                <h3>Customer Details</h3>
                                <p>Name: {order.customer.name}</p>
                                <p>Customer ID: {order.customer.customerId}</p>
                                <p>Contact: {order.customer.contact}</p>
                                <p>Email: {order.customer.email}</p>
                                <p>Gender: {order.customer.gender}</p>
                                <p>Age: {order.customer.age}</p>
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
        </>
      )}
    </div>
  );
};

export default AdminCustomersDetails;
