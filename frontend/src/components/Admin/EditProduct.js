import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import useNotify from "../../hooks/useNotify";
import { ToastContainer } from "react-toastify";

const EditProduct = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [category, setCategory] = useState("");
  const [weightPrices, setWeightPrices] = useState([]);
  const [note, setNote] = useState("");
  const { user } = useAuthContext();
  const { id } = useParams();
  const { notify } = useNotify();
  const [bestseller, setBestseller] = useState()
  const [newImages, setNewImages] = useState([]); // For new images (files)
  const [isCakeOfTheWeek, setIsCakeOfTheWeek] = useState(false);

const fetchProduct = async () => {
  try {
    const response = await fetch(`http://localhost:3001/products/getproductbyid/${id}`);
    const json = await response.json();
    if (response.ok) {
      console.log(json)
      setTitle(json?.product?.title);
      setPrice(json?.product?.defaultPrice);
      setDescription(json?.product?.description);
      setNote(json?.product?.note);
      setCategory(json?.product?.category);
      setBestseller(json?.product?.bestseller);
        // Process prices array for weights
        const formattedPrices = json?.product?.prices.reduce((acc, priceObj) => {
          acc[priceObj.weight] = priceObj.price;
          return acc;
        }, {});
        setWeightPrices(formattedPrices || {});
      
      // Store existing images separately 
      setImages(json?.product?.productImages || []); // URLs
    }
  } catch (error) {
    console.log(error);
  }
};

  

  useEffect(() => {
    if (user?.userType === "Admin") {
      fetchProduct();
      console.log(images)
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
  
    if (images.length + newImages.length + uploadedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
  
    setNewImages((prev) => [...prev, ...uploadedFiles]); // Store new images separately
  };
  
  

  const handleImageDelete = (index, isOldImage = false) => {
    if (isOldImage) {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
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

  const handlePublish = () => {
    alert("Product published successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append("title", title);
    formData.append("description", description);
    formData.append("bestseller", false);
    formData.append("itemInStock", true);
    formData.append("category", category);
    formData.append("defaultPrice", price);
    formData.append("note", note);
  
    // Function to convert image URLs to File objects
    // Function to extract filename from URL
  const getFileNameFromUrl = (url) => {
    return url.split("/").pop(); // Extracts the last part of the URL
  };

  // Function to convert image URLs to File objects with original names
  const urlToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileName = getFileNameFromUrl(url);
    return new File([blob], fileName, { type: blob.type });
  };
  
    // Convert existing image URLs to File objects and append
    const existingImagesAsFiles = await Promise.all(images.map((url, index) => urlToFile(url, index)));
    existingImagesAsFiles.forEach((file) => {
      formData.append("productImages", file);
    });
  
    // Append new images as files
    newImages?.forEach((file) => {
      if (file instanceof File) {
        formData.append("productImages", file);
      }
    });
  
    console.log("Final Images (Files):", formData.getAll("productImages"));
  
    const pricesArray = selectedWeights.map((weight) => ({
      weight,
      price: weightPrices[weight],
    }));
  
    formData.append("prices", JSON.stringify(pricesArray));
  
    try {
      const response = await fetch(`http://localhost:3001/products/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });
  
      const json = await response.json();
      if (response.ok) {
        notify("Product updated successfully", "success");
      }
    } catch (error) {
      notify("Error updating the product", "error");
    }
  };
  
  

  const makeBestseller = async (newBestseller) => {
    try {
      const formData = new FormData();
      formData.append('bestseller', newBestseller);
      
      const response = await fetch(`http://localhost:3001/products/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
        body: formData,
      });
  
      const json = await response.json();
      
      if (response.ok) {
        notify(newBestseller ? "Updated product as bestseller" : "Removed product as bestseller", "success");
        console.log(json);
      } else {
        notify(json.message || "Failed to update product", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Error updating the product", "error");
    }
  };
  
  const makeCakeOfTheWeek = async () => {
    try {
      const formData = {
        "product": id
      };
  
      const response = await fetch(`http://localhost:3001/ctw/createctw`, {
        method: "POST", // Use DELETE if removing Cake of the Week
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const json = await response.json();
      console.log(formData);
  
      if (response.ok) {
        notify("Updated Cake of the Week", "success");
        console.log(json);
      } else {
        notify(json.message || "Failed to update product", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Error updating the product", "error");
    }
  };
  

  

  return (
    <div className="add-new-product-container">
      <div className="top-buttons-container">
        <Link to="/admin" className="admin-navbar-logo-link">
          <button className="back-button">Back</button>
        </Link>
        <div className="top-buttons">
        <button className="update-button" onClick={() => { 
  const newBestseller = !bestseller;
  setBestseller(newBestseller);  // Toggle bestseller state
  makeBestseller(newBestseller);  // Pass the updated state directly
}}>
  {bestseller ? "Remove" : "Update"} Product as Bestseller
</button>
          <button className="update-button" onClick={makeCakeOfTheWeek}>{isCakeOfTheWeek ? "Remove product as Cake of the Week" : "Update product as Cake of the Week"}</button>
        </div>
      </div>

      <form className="product-form" encType="multipart/form-data" onSubmit={handleSubmit}>
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
        src={`http://localhost:3001/uploads/${image}`}
        alt={`Uploaded ${index + 1}`}
        className="uploaded-image"
      />
      <button
        type="button"
        className="delete-image-button"
        onClick={() => handleImageDelete(index, true)}
      >
        ×
      </button>
    </div>
  ))}

  {newImages.map((file, index) => (
    <div className="uploaded-image-wrapper" key={index + images.length}>
      <img
        src={URL.createObjectURL(file)}
        alt={`New Upload ${index + 1}`}
        className="uploaded-image"
      />
      <button
        type="button"
        className="delete-image-button"
        onClick={() => handleImageDelete(index, false)}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="categories-section">
            <p>Product Category:</p>
            <div className="cats">
              {["Cake", "Chocolate", "Gifting"].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`category-button ${category === cat ? "selected" : ""}`}
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
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
