import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddNewProduct.css"; // Include this CSS file
import { useAuthContext } from "../../hooks/useAuthContext";
import useNotify from "../../hooks/useNotify";
import { ToastContainer } from "react-toastify";

const AddNewProduct = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [category, setCategory] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const { user } = useAuthContext();
  const [weightPrices, setWeightPrices] = useState([]);
  const {notify} = useNotify();
  const [note, setNote] = useState(
    `- Deliveries will take place between 11 AM and 7 PM on the chosen date. Same-day orders will be delivered via Uber, additional charges will apply.\n- Short messages will be inscribed on a plaque, while longer messages will be included on a card.`
  );

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (images.length + uploadedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...uploadedFiles]);
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleWeightSelection = (weight) => {
    setSelectedWeights((prevWeights) =>
      prevWeights.includes(weight)
        ? prevWeights.filter((w) => w !== weight)
        : [...prevWeights, weight]
    );
  };

  const handleWeightPriceChange = (weight, value) => {
    setWeightPrices((prevPrices) => ({
      ...prevPrices,
      [weight]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("bestseller", false); // You can adjust this if needed
    formData.append("itemInStock", true); // Adjust as needed
    formData.append("category", category);
    formData.append("defaultPrice", price);
    formData.append("note", note);
  
    // Append images
    images.forEach((file) => {
      formData.append("productImages", file); // 'productImages' will be used for uploading
    });
  
    // Prepare prices array
    const pricesArray = selectedWeights.map((weight) => ({
      weight,
      price: weightPrices[weight],
    }));
  
    // Append prices as a JSON string array
    formData.append("prices", JSON.stringify(pricesArray));
  
    try {
      const response = await fetch("http://localhost:3001/products/addproduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`, // If you need authentication
        },
        body: formData, // Send the form data here
      });
  
      const json = await response.json();
      if (response.ok) {
        console.log("Product added successfully:", json);
        notify('Product added successfully', "success");
        setImages([]);
       setTitle("");
        setPrice("");
        setDescription("");
        setSelectedWeights([]);
        setCategory("");
       setDefaultPrice("");
        setWeightPrices([]);

      } 
    } catch (error) {
      console.error("Error submitting product:", error);
      notify("Error adding the product", "error")
    }
  };
  
  
  
  
  
  

  return (
    <div className="add-new-product-container">
      <Link to="/admin" className="admin-navbar-logo-link">
        <button className="back-button">Back</button>
      </Link>
      <form
        encType="multipart/form-data"
        className="product-form"
        onSubmit={handleSubmit}
      >
        <div className="image-section">
          <label htmlFor="image-upload" className="upload-placeholder">
            <span>+</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            name="productImages"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div className="uploaded-images-container">
            {images.map((image, index) => (
              <div className="uploaded-image-wrapper" key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="uploaded-image"
                  name="productImages"
                  type="file"
                  multiple 
                />
                <button
                  className="delete-image-button"
                  onClick={() => handleImageDelete(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="details-section">
          <input
            type="text"
            placeholder="Title of the Listing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
          />
          <input
            type="number"
            placeholder="₹"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input-price"
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-description"
          />

          <div className="weights-section">
            <p>Select all the weights in which the cake will be available:</p>
            <div className="weights-buttons">
              {["1/2 KG", "1 KG", "2 KG"].map((weight) => (
                <button
                  type="button"
                  key={weight}
                  className={`weight-button ${
                    selectedWeights.includes(weight) ? "selected" : ""
                  }`}
                  onClick={() => handleWeightSelection(weight)}
                >
                  {weight}
                </button>
              ))}
            </div>
            <div className="set-weight-price-section">
              <p>Set Weight Price:</p>
              {selectedWeights.map((weight) => (
                <div key={weight} className="weight-price-input">
                  <label>{weight}</label>
                  <input
                    type="number"
                    placeholder={`Price for ${weight}`}
                    value={weightPrices[weight] || ""}
                    onChange={(e) =>
                      handleWeightPriceChange(weight, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="edit-note-section">
            <p className="edit-note-title">Edit Note:</p>
            <textarea
              className="edit-note"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>

          <div className="categories-section">
            <p>Product Category:</p>
            <div className="cats">
              {["Cake", "Chocolate", "Gifting"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-button ${
                    category === cat ? "selected" : ""
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button className="publish-button" type="submit">
            Publish Product
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddNewProduct;
