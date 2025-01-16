import React, { useState } from "react";
import "./EditProduct.css"; // Make sure to include this CSS file

const EditProduct = () => {
  const [images, setImages] = useState([]); // Manage multiple images
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [category, setCategory] = useState("");

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (images.length + uploadedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    const newImages = uploadedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
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

  const handlePublish = () => {
    console.log({
      title,
      price,
      description,
      selectedWeights,
      category,
      images,
    });
    alert("Product published successfully!");
  };

  return (
    <div className="add-new-product-container">
      {/* Top Buttons */}
     

      <div className="top-buttons-container">
  <button className="back-button">Back</button>
  <div className="top-buttons">
    <button className="update-button">Update Product as Bestseller</button>
    <button className="update-button">Update Product as Cake of the Week</button>
  </div>
</div>

      <div className="product-form">
        {/* Image Upload Section */}
        <div className="image-section">
          <label htmlFor="image-upload" className="upload-placeholder">
            <span>+</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div className="uploaded-images-container">
            {images.map((image, index) => (
              <div className="uploaded-image-wrapper" key={index}>
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="uploaded-image"
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

        {/* Product Details Section */}
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
            placeholder="Price"
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
            <p>Select all the weights in which the cake will be available, leave blank for other products</p>
            <div className="weights-buttons">
              {["1/2 KG", "1 KG", "2 KG"].map((weight) => (
                <button
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
          </div>

          {/* Edit Notes */}
          <div className="edit-note-section">
            <p className="edit-note-title">Edit Note:</p>
            <textarea
              className="edit-note"
              readOnly
              value={`- Deliveries will take place between 11 AM and 7 PM on the chosen date. Same-day orders will be delivered via Uber, additional charges will apply.\n- Short messages will be inscribed on a plaque, while longer messages will be included on a card.`}
            />
          </div>

          {/* Product Category Section */}
          <div className="categories-section">
            <p>Product Category:</p>
            <div className="cats">
              {["Cake", "Chocolates", "Gifting"].map((cat) => (
                <button
                  key={cat}
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

          {/* Publish Button */}
          <button className="publish-button" onClick={handlePublish}>
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
