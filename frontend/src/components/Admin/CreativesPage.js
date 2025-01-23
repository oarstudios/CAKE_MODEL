import React, { useState } from "react";
import "./CreativesPage.css";

const CreativesPage = () => {
  const [carouselDesktopImages, setCarouselDesktopImages] = useState([]);
  const [carouselMobileImages, setCarouselMobileImages] = useState([]);
  const [bannerDesktopImages, setBannerDesktopImages] = useState([]);
  const [bannerMobileImages, setBannerMobileImages] = useState([]);

  const handleFileUpload = (event, type, category) => {
    const files = Array.from(event.target.files);
    const previewImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    if (category === "carousel") {
      if (type === "desktop") {
        setCarouselDesktopImages([...carouselDesktopImages, ...previewImages]);
      } else {
        setCarouselMobileImages([...carouselMobileImages, ...previewImages]);
      }
    } else if (category === "banner") {
      if (type === "desktop") {
        setBannerDesktopImages([...bannerDesktopImages, ...previewImages]);
      } else {
        setBannerMobileImages([...bannerMobileImages, ...previewImages]);
      }
    }
  };

  const removeImage = (index, type, category) => {
    if (category === "carousel") {
      if (type === "desktop") {
        setCarouselDesktopImages((prev) =>
          prev.filter((_, i) => i !== index)
        );
      } else {
        setCarouselMobileImages((prev) =>
          prev.filter((_, i) => i !== index)
        );
      }
    } else if (category === "banner") {
      if (type === "desktop") {
        setBannerDesktopImages((prev) =>
          prev.filter((_, i) => i !== index)
        );
      } else {
        setBannerMobileImages((prev) =>
          prev.filter((_, i) => i !== index)
        );
      }
    }
  };

  const renderImageGrid = (images, type, category) => (
    <div className="image-grid">
      {images.map((img, index) => (
        <div key={index} className="image-preview">
          <img src={img.preview} alt={`Creative ${index}`} />
          <button
            className="remove-button"
            onClick={() => removeImage(index, type, category)}
          >
            ×
          </button>
        </div>
      ))}
      <label className="upload-box">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileUpload(e, type, category)}
        />
        <div className="upload-icon">+</div>
      </label>
    </div>
  );

  return (
    <div className="creatives-page">
      <h1 className="creatives-page-title">Edit Home Page Carousel Images</h1>

      <div className="creative-section">
        <h2 className="creative-section-title">Desktop/Tablet</h2>
        {renderImageGrid(carouselDesktopImages, "desktop", "carousel")}
      </div>

      <div className="creative-section">
        <h2 className="creative-section-title">Mobile</h2>
        {renderImageGrid(carouselMobileImages, "mobile", "carousel")}
      </div>

      <h1 className="creatives-page-title">Edit Home Page Banner Images</h1>

      <div className="creative-section">
        <h2 className="creative-section-title">Desktop/Tablet</h2>
        {renderImageGrid(bannerDesktopImages, "desktop", "banner")}
      </div>

      <div className="creative-section">
        <h2 className="creative-section-title">Mobile</h2>
        {renderImageGrid(bannerMobileImages, "mobile", "banner")}
      </div>
    </div>
  );
};

export default CreativesPage;
