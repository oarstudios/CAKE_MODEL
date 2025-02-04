import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderSection.css";
import cake from "../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg";
import FullStar from "../../images/NoRating.png";
import EmptyStar from "../../images/Rating.png";
import UploadIcon from "../../images/Vector.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ToastContainer } from "react-toastify";
import useNotify from "../../hooks/useNotify";

const OrderSection = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("");
  const [inputs, setInputs] = useState({});
  const [ratings, setRatings] = useState({});
  const [prds, setPrds] = useState([])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    return `${getDaySuffix(day)} ${month} ${year}`;
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3001/billing/${id}`);
      const json = await response.json();

      if (response.ok && json?.data) {
        setOrder(json);
        console.log(json)

        const productFetches = json.data.productIds.map((item) =>
          fetch(`http://localhost:3001/products/getproductbyid/${item?.product?._id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
            .then((response) => response.json())
            .catch((error) => {
              console.error("Product fetch error:", error);
              return null;
            })
        );

        const products = await Promise.all(productFetches);
        const updatedCartItems = json.data.productIds.map((item, index) => ({
          ...item,
          product: products[index],
        }));

         // Filter out products with duplicate IDs
      const uniqueProducts = updatedCartItems.filter((value, index, self) => 
        index === self.findIndex((t) => t.product?.product?._id === value.product?.product?._id)
      );

        const sortedOrders = uniqueProducts.sort(
          (a, b) => new Date(b.product?.createdAt) - new Date(a.product?.createdAt)
        );
        const sortedOrders2 = updatedCartItems.sort(
          (a, b) => new Date(b.product?.createdAt) - new Date(a.product?.createdAt)
        );

        setProducts(sortedOrders2);
        setPrds(sortedOrders);
        console.log(updatedCartItems)
      } else {
        console.error("Error: Unable to fetch billing data or data is missing.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
      
    }
  }, [user]);

  const totalPrice = order?.billPrice

  const handleTextChange = (e, itemId) => {
    const text = e.target.value;
    setInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        review: text.trim() ? text : "",
      },
    }));
  };

  const handleImageUpload = (e, itemId) => {
    const files = Array.from(e.target.files);
    // const newImages = files.map((file) => URL.createObjectURL(file));

    setInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        media: [...(prev[itemId]?.media || []), ...files],
      },
    }));
  };

  const isSubmitEnabled = (itemId) => {
    const itemInputs = inputs[itemId];
    return itemInputs?.review || (itemInputs?.media?.length > 0);
  };

  const handleClick = (index, productId) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: index + 1,
    }));

    setInputs((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        rating: index + 1,
      },
    }));
  };


  useEffect(()=>{
    console.log(inputs)
  },[inputs])

  const {notify} = useNotify();

  const handleReviewSubmit = async (e, id) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("username", user?.username);
    formData.append("review", inputs[id]?.review);
    formData.append("rating", inputs[id]?.rating);
    
    // Append the media files to formData
    (inputs[id]?.media || []).forEach((file) => {
      formData.append("media", file); // media should match the field name used in the multer upload
    });
  
    try {
      const response = await fetch(`http://localhost:3001/reviews/createreview/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        },
        body: formData, // Use FormData here
      });
  
      const json = await response.json();
      if (response.ok) {
        notify("Review added successfully", "success")
        console.log(json);
      } else {
        console.error(json);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="order-section">
      <div className="order-left">
        <h3 className="order-id">Order ID {order?.data?.billId}</h3>
        <h2 className="order-date">{formatDate(order?.data?.createdAt)}</h2>
        <p className="delivered-date">
          {/* Delivered on <span>31st Dec 2024</span> */}
        </p>
        <h3 className="customer-name">{user?.username}</h3>
        <p className="customer-phone">
          Phone <br /> {order?.data?.shippingAddress?.phoneNo}
        </p>
        <p className="customer-address">
          Address <br /> {order?.data?.shippingAddress?.address}
        </p>

        <h3 className="feedback-title">Tell us how much you loved it!</h3>
        {prds?.map((item) => (

          <form className="feedback-item" key={item?.product?.product?._id} onSubmit={(e)=>handleReviewSubmit(e, item?.product?.product?._id)} encType='multipart/form-data'>
            {/* {console.log(item)} */}
            <div className="item-details">
              <img src={`http://localhost:3001/uploads/${item?.product?.product?.productImages[0]}`} alt={item.name} className="item-image" />
              <p className="item-name">{item?.product?.product?.title}</p>
            </div>
            <div className="rating-section">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < (ratings[item?.product?.product?._id] || 0) ? FullStar : EmptyStar}
                  alt={
                    index < (ratings[item?.product?.product?._id] || 0) ? "Full Star" : "Empty Star"
                  }
                  className="star-icon"
                  onClick={() => handleClick(index, item?.product?.product?._id)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <div className="review-container">
              <textarea
                className="review-box"
                placeholder="Write a review"
                onChange={(e) => handleTextChange(e, item?.product?.product?._id)}
              ></textarea>
              <div className="image-preview-grid">
                {(inputs[item?.product?.product?._id]?.media || []).map((imageUrl, index) => (
                  <div key={index} className="image-preview">
                    <img
                    type="file"
                    name="media"
                      src={URL.createObjectURL(imageUrl)}
                      alt={`Uploaded ${index + 1}`}
                      className="uploaded-preview"
                      multiple 
                    />
                  </div>
                ))}
              </div>
              <label htmlFor={`upload-${item?.product?.product?._id}`} className="upload-icon">
                <img src={UploadIcon} alt="Upload Icon" />
              </label>
              <input
  name="media"  // Add this
  id={`upload-${item?.product?.product?._id}`}
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => handleImageUpload(e, item?.product?.product?._id)}
  style={{ display: "none" }}
/>

              <button
                className="submit-btn"
                disabled={!isSubmitEnabled(item?.product?.product?._id)}
                style={{
                  backgroundColor: isSubmitEnabled(item?.product?.product?._id)
                    ? " rgba(213, 178, 107, 1)"
                    : "rgba(200, 200, 200, 1)",
                  cursor: isSubmitEnabled(item?.product?.product?._id) ? "pointer" : "not-allowed",
                }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        ))}
      </div>
      <div className="billing-right">
        <div className="cart-items">
          {products?.map((item) => (
            <Link
              to={`/product/${item?.product?.product?._id}`}
              className="orders-link"
              key={item?._id}
            >
              <div className="cart-item" key={item._id}>
                <div className="cart-product-info">
                  <img
                    src={`http://localhost:3001/uploads/${item?.product?.product?.productImages[0]}`}
                    alt={item?.product?.title}
                    className="cart-product-image"
                  />
                  <div className="cart-product-details">
                    <p className="cart-product-name">{item?.product?.product?.title}</p>
                    <p className="cart-product-price">Rs {item?.price}</p>
                  </div>
                </div>
                <div className="quantity-info">
                  <p className="quantity">x {item?.quantity}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="summary">
          <div className="summary-item">
            <span className="shipping-heading">Shipping</span>
            <span className="shipping-rates">Free</span>
          </div>
          <div className="summary-item">
            <span className="shipping-total-heading">Total</span>
            <span className="shipping-total-amount">Rs {order?.data?.billPrice}</span>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default OrderSection;
