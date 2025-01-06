import React from 'react';
import './Banner.css';
import chocolateBanner from '../../images/Cakes section banner.png'; // Replace with the actual path to your uploaded image

function Banner() {
  return (
    <div className="banner">
      <img src={chocolateBanner} alt="Exquisite Chocolate Creations" className="banner-image" />
    </div>
  );
}

export default Banner;
