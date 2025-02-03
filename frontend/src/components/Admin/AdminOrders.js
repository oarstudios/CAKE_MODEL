import React, { useState, useEffect } from "react";
import "./AdminOrders.css";
import AdminOrdersMobile from "./AdminOrdersMobile"; // Importing AdminOrdersMobile
import img1 from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminOrders = () => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false); // State to detect mobile view
  const ordersPerPage = 15;
  const {user} = useAuthContext();
  const [opd, setOpd] = useState([])
  const [orders, setOrders] = useState([])
  const [sts, setSts] = useState()


  const fetchBills = async (status = 'all') => {
    try {
      // Adjust the API URL to fetch bills
      const response = await fetch(`http://localhost:3001/billing`);
  
      const json = await response.json();
      if (response.ok) {
        console.log('Fetched Bills:', json);
  
        // Sort the bills based on status
        const sortedBills = json?.data.sort((a, b) => {
          // Sorting logic: You can customize this logic as per your need
          if (a.status === b.status) return 0;
          return a.status < b.status ? -1 : 1;
        });
  
        // If you want to filter by a specific status:
        const filteredBills = status === 'all' 
          ? sortedBills
          : sortedBills.filter(bill => bill.status.toLowerCase() === status.toLowerCase());
  
        // Set the state with the sorted (and optionally filtered) bills
        setOpd(filteredBills);
      } else {
        console.error('Failed to fetch bills:', json);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  



  useEffect(()=>{
    if(user?.userType === "Admin")
    {
      fetchBills();
    }
  },[user])


  const fetchProductsByIds = async (productIds) => {
    const requests = productIds.map(id =>
      fetch(`http://localhost:3001/products/getproductbyid/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      }).then(response => response.json())
    );
    const products = await Promise.all(requests);
    return products;
  };
  
  const fetchUserById = async (userId) => {
    const response = await fetch(`http://localhost:3001/users/getuserbyid/${userId}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });
    const userData = await response.json();
    return userData;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!opd || opd.length === 0) return;
  
        // Fetch products in batch
        const allProductIds = opd.flatMap(order => order.productIds.map(item => item.product._id));
        const products = await fetchProductsByIds(allProductIds);
  
        // Attach products to orders and merge product details into productIds
        const updatedOrders = opd.map(order => {
          return {
            ...order,
            productIds: order.productIds.map(item => {
              const product = products.find(p => p.product._id === item.product._id);
              return product ? {
                ...item,
                productDetails: product.product, // Add product details (like title, description, etc.)
                quantity: item.quantity,          // Keep existing quantity
                weight: product.product.weight    // Assuming product has weight field
              } : item; // If no product found, keep the item unchanged
            })
          };
        });
  
        // Fetch user data in batch
        const updatedOrdersWithUsers = await Promise.all(updatedOrders.map(async (order) => {
          const userId = order.userId?._id;
          const userData = userId ? await fetchUserById(userId) : {};
          return {
            ...order,
            userDetails: userData,
          };
        }));
  
        setOrders(updatedOrdersWithUsers);
        console.log('Updated Orders with Products and User Data:', updatedOrdersWithUsers);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (opd && opd.length > 0) {
      fetchData();
    }
  }, [opd, user]);
  
  


  const orders2 = [
    {
      id: "#000001",
      productName: "Dutch Chocolate Truffle Cake",
      address:
        "501, Elita Apartments, Sector 6, Plot 22, Kamohe, Navi Mumbai, 410209",
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
      id: "#000002",
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
      id: "#000003",
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

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450); // Set breakpoint for mobile
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  const formatAddress = (address) => {
    return `${address.firstName} ${address.lastName}, ${address.address}, ${address.landmark}, ${address.city}, ${address.state}, ${address.pincode}, Phone: ${address.phoneNo}`;
  };

  
  const updateBill = async(id, status)=>{

    try{
      const formData = {
        "status": status
      }
  
      const response = await fetch(`http://localhost:3001/billing/${id}/${user?._id}`,{
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
  
      const json = await response.json();
  
      if(response.ok)
      {
        console.log(json)
        fetchBills();
      }
    }catch(error){
      console.log(error)
    }

   
  }

  return (
    <div className="admin-orders">
      {isMobile ? (
        // Render Mobile Version
        <AdminOrdersMobile orders={orders} />
      ) : (
        // Render Desktop Version
        <>
          <div className="orders-navigation">
            <button className="active" onClick={()=>fetchBills('all')}>All Orders</button>
            <button onClick={()=>fetchBills('delivered')}>Completed</button>
            <button onClick={()=>fetchBills('pending')}>Pending</button>
            <button onClick={()=>fetchBills('canceled')}>Canceled</button>
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
                    <React.Fragment key={order._id}>
                      <tr
                        onClick={() => toggleOrderDetails(order._id)}
                        className={`order-row ${
                          activeOrder === order._id ? "active-order" : ""
                        }`}
                      >
                        <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td>
                        <td>{order?.billId}</td>

                        <td>{order?.productIds?.map((prd, index)=>(
                          <span key={index}>{prd?.productDetails?.title + " "}</span>
                        ))}</td>
                        <td>{formatAddress(order?.shippingAddress)}</td>
                        <td>{formatDate(order?.createdAt)}</td>
                        <td>{order?.billPrice}</td>
                        <td>
                          <span className={`status ${order?.status}`}>
                            {order?.status}
                          </span>
                        </td>
                      </tr>
                      {activeOrder === order._id && (
                        <tr
                          className={`order-details-row ${
                            activeOrder === order._id ? "active-order-details" : ""
                          }`}
                        >
                          <td colSpan="7">
                            <div className="order-details">
                              <div className="customer-details">
                                <h3>Customer Details</h3>
                                <p>Name: {order?.shippingAddress?.firstName}</p>
                                <p>Customer ID: {order?.userDetails?._id}</p>
                                <p>Contact: {order?.shippingAddress?.phoneNo}</p>
                                <p>Email: {order?.email}</p>
                                <p>
                                  <strong>Payment Method:</strong>{" "}
                                  Online
                                </p>
                              </div>
                              <div className="order-items">
                                <h3>Order Details</h3>
                                {order?.productIds?.map((item) => (
                                  <div key={item._id} className="order-item">
                                    <img
                                      src={`http://localhost:3001/uploads/${item?.productDetails?.productImages[0]}`}
                                      alt={item?.product?.title}
                                      className="cake-image"
                                    />
                                    <span>{item?.productDetails?.title}</span>
                                    <span>x{item?.quantity}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="update-status">
                                <h3>Update Order Status</h3>
                                <button className="Pending" onClick={()=>updateBill(order?._id, "Pending")}>Pending</button>
                                <button className="Delivered" onClick={()=>updateBill(order?._id, "Delivered")}>Delivered</button>
                                <button className="Canceled" onClick={()=>updateBill(order?._id, "Canceled")}>Canceled</button>
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

export default AdminOrders;
