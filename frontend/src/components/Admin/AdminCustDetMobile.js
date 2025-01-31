import React, { useState } from "react";
import "./AdminOrdersMobile.css";

const AdminCustDetMobile = ({ orders = [] }) => { // Default value added
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;
  const [filter, setFilter] = useState("All");

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleFilterClick = (status) => {
    setFilter(status);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const filterOrders = (orders, filter) => {
    if (filter === "All") return orders;
    return orders.filter((order) => order.status === filter);
  };

  const paginateOrders = (orders, currentPage, ordersPerPage) => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return orders.slice(startIndex, startIndex + ordersPerPage);
  };

  const filteredOrders = filterOrders(orders, filter);
  const paginatedOrders = paginateOrders(filteredOrders, currentPage, ordersPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedOrderId(null); // Close active order when switching pages
  };

  return (
    <div className="orders-list-mobile">
      {/* Orders List */}
      {paginatedOrders?.map((order) => ( // Guard added to ensure no errors
        <div key={order.id} className="order-container">
          {/* Minimal details shown initially */}
          <div className="order-row-mobile" onClick={() => toggleDetails(order.id)}>
          <p>
              <strong>Customer Name:</strong> {order.name}
            </p>
            <p>
              <strong>No. of Orders:</strong> {order.orders}
            </p>
            <p>
              <strong>Total Spent:</strong> {order.totalSpent}
            </p>
          </div>

          {/* Expanded details */}
          {expandedOrderId === order.id && (
            <div className="order-details-row-mobile">
              {/* Customer Details */}
              <div className="customer-details">
                <h3>Customer Details</h3>
                <p>
                  <strong>Name:</strong> {order.customer?.name || "N/A"}
                </p>
                <p>
                  <strong>Customer ID:</strong> {order.customer.customerId || "N/A"}
                </p>
                <p>
                  <strong>Contact:</strong> {order.customer.contact || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {order.customer.email || "N/A"}
                </p>
                <p>
                  <strong>Gender:</strong> {order.customer.gender || "N/A"}
                </p>
                <p>
                  <strong>Age:</strong> {order.customer.age || "N/A"}
                </p>
              </div>

              
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`pagination-btn ${currentPage === i + 1 ? "active-page" : ""}`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminCustDetMobile;
