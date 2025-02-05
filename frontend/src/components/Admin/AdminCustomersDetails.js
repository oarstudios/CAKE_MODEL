import React, { useState, useEffect } from "react";
import "./AdminOrders.css";
import "./AdminCustomersDetails.css";
import AdminCustDetMobile from "./AdminCustDetMobile"; // Importing the mobile version
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminCustomersDetails = () => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false); // State to detect mobile view
  const ordersPerPage = 15;
  const [users, setUsers] = useState([]); 
  const [bills, setBills] = useState([]); 

  const { user } = useAuthContext();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/getusers`);
      const json = await response.json();
      if (response.ok) {
        setUsers(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBills = async () => {
    try {
      // Fetch bills
      const response = await fetch(`http://localhost:3001/billing`);
      const json = await response.json();
      if (response.ok) {
        setBills(json);
        console.log('Fetched Bills:', json);
      } else {
        console.error('Failed to fetch bills:', json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.userType === "Admin") {
      fetchUsers();
      fetchBills();
    }
  }, [user]);

  // Calculate the total spent and total number of orders for each user
  const calculateTotalSpentAndOrders = (userId) => {
    const userBills = bills?.data?.filter(bill => bill?.userId?._id === userId); // Filter bills by userId
    console.log(userBills)
    const totalSpent = userBills?.reduce((acc, bill) => acc + parseFloat(bill.billPrice), 0); // Sum up the total spent
    const totalOrders = userBills?.length; // Count the number of orders
    return { totalSpent, totalOrders };
  };

  const totalPages = Math.ceil(users.length / ordersPerPage);

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

  const formatAddress = (address) => {
    return `${address?.firstName} ${address?.lastName}, ${address?.address}, ${address?.landmark}, ${address?.city}, ${address?.state}, ${address?.pincode}`;
  };

  return (
    <div className="admin-orders">
      {isMobile ? (
        <AdminCustDetMobile
          orders={users}
          currentPage={currentPage}
          ordersPerPage={ordersPerPage}
        />
      ) : (
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
                {paginateOrders(users, currentPage, ordersPerPage).map((user, index) => {
                  const { totalSpent, totalOrders } = calculateTotalSpentAndOrders(user._id);
                  return (
                    <React.Fragment key={user._id}>
                      <tr
                        onClick={() => toggleOrderDetails(user._id)}
                        className={`order-row ${activeOrder === user._id ? "active-order" : ""}`}
                      >
                        <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user?.address ? formatAddress(user?.address) : "-"}</td>
                        <td>{totalSpent}</td> {/* Format totalSpent */}
                        <td>{totalOrders}</td>
                      </tr>
                      {activeOrder === user._id && (
                        <tr className={`order-details-row ${activeOrder === user._id ? "active-order-details" : ""}`}>
                          <td colSpan="6">
                            <div className="admin-order-details">
                              <div className="admin-customer-details">
                                <h3>Customer Details</h3>
                                <p>Name: {user?.username}</p>
                                <p>Customer ID: {user?._id}</p>
                                <p>Contact: {user?.phoneNo}</p>
                                <p>Email: {user?.email}</p>
                                <p>Gender: {user?.gender}</p>
                                <p>Age: {user?.age}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>
              Showing {ordersPerPage * (currentPage - 1) + 1} -{" "}
              {Math.min(ordersPerPage * currentPage, users.length)} of{" "}
              {users.length} Users
            </span>
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
        </>
      )}
    </div>
  );
};

export default AdminCustomersDetails;
