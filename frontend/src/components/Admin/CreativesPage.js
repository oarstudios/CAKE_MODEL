import React, { useState } from "react";


const CreativesPage = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);

  const handleFileUpload = (event, type) => {
    const files = Array.from(event.target.files);
    const previewImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    if (type === "desktop") {
      setDesktopImages([...desktopImages, ...previewImages]);
    } else if (type === "mobile") {
      setMobileImages([...mobileImages, ...previewImages]);
    }
  };

  return (
    <>
      <div className="creatives-page">
        <h1 className="creatives-page-title">Edit Home Page Carousel Images</h1>
        
        <div className="creative-section">
          <h2 className="creative-section-title">Desktop/Tablet</h2>
          <div className="image-grid">
            {desktopImages.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img.preview} alt={`Creative ${index}`} />
              </div>
            ))}
            <label className="upload-box">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => handleFileUpload(e, "desktop")}
              />
              <div className="upload-icon">+</div>
            </label>
          </div>
        </div>

        <div className="creative-section">
          <h2 className="creative-section-title">Mobile</h2>
          <div className="image-grid">
            {mobileImages.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img.preview} alt={`Creative ${index}`} />
              </div>
            ))}
            <label className="upload-box">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => handleFileUpload(e, "mobile")}
              />
              <div className="upload-icon">+</div>
            </label>
          </div>
        </div>
      </div>

      <div className="creatives-page">
        <h1 className="creatives-page-title">Edit Home Page Banner Image</h1>
        
        <div className="creative-section">
          <h2 className="creative-section-title">Desktop/Tablet</h2>
          <div className="image-grid">
            {desktopImages.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img.preview} alt={`Creative ${index}`} />
              </div>
            ))}
            <label className="upload-box">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => handleFileUpload(e, "desktop")}
              />
              <div className="upload-icon">+</div>
            </label>
          </div>
        </div>

        <div className="creative-section">
          <h2 className="creative-section-title">Mobile</h2>
          <div className="image-grid">
            {mobileImages.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img.preview} alt={`Creative ${index}`} />
              </div>
            ))}
            <label className="upload-box">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => handleFileUpload(e, "mobile")}
              />
              <div className="upload-icon">+</div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreativesPage;
