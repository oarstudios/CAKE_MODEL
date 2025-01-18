import React, { useState } from 'react';
import './CustomerReviews.css';

// Import the images
import FullStar from '../../images/NoRating.png';
import EmptyStar from '../../images/Rating.png';
import UserIcon from '../../images/user.png'; // Generic user icon
import img1 from '../../images/WhatsApp Image 2025-01-16 at 18.44.01_8f1272c7.jpg';

const reviews = [
  {
    id: 1,
    name: 'Akshat Agrawal',
    rating: 5,
    title: 'Triple Chocolate Cheesecake - Eggless',
    review: 'Absolutely heavenly! The chocolate fudge cake was moist, rich, and packed with flavor. It was a hit at our family gathering, and everyone asked for seconds. Definitely ordering again!',
    images: [img1, img1],
  },
  {
    id: 2,
    name: 'Omkar Garate',
    rating: 4,
    title: 'Triple Chocolate Cheesecake - Eggless',
    review: 'Sometimes simple is best, and this vanilla bean cake proved it! Light, fluffy, and with an incredible depth of vanilla flavor. It was perfect for my daughter’s birthday, and everyone loved it.',
    images: [img1, img1],
  },
  {
    id: 3,
    name: 'Omkar Garate',
    rating: 4,
    title: 'Triple Chocolate Cheesecake - Eggless',
    review: 'Sometimes simple is best, and this vanilla bean cake proved it! Light, fluffy, and with an incredible depth of vanilla flavor. It was perfect for my daughter’s birthday, and everyone loved it.',
  },
  {
    id: 4,
    name: 'Omkar Garate',
    rating: 4,
    title: 'Triple Chocolate Cheesecake - Eggless',
    review: 'Sometimes simple is best, and this vanilla bean cake proved it! Light, fluffy, and with an incredible depth of vanilla flavor. It was perfect for my daughter’s birthday, and everyone loved it.',
    images: [img1, img1],
  },
  {
    id: 5,
    name: 'Jane Doe',
    rating: 3,
    title: 'Chocolate Cake',
    review: 'The cake was good, but it was a bit too sweet for my taste. The texture, however, was perfect!',
    images: [],
  },
  {
    id: 6,
    name: 'John Smith',
    rating: 5,
    title: 'Amazing Cheesecake!',
    review: 'One of the best cheesecakes I’ve had in years! Highly recommend it to anyone who loves desserts.',
    images: [img1],
  },
];

const CustomerReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Display 5 reviews per page

  // Calculate the current reviews to display
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? FullStar : EmptyStar}
          alt={i <= rating ? 'Full Star' : 'Empty Star'}
          className="star-icon"
        />
      );
    }
    return stars;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-button ${number === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="customer-reviews">
      <h2>Customer Reviews ({reviews.length})</h2>
      <div className="rating-summary">
        <div className="stars">{renderStars(4)}</div>
        <p>4.0 out of 5</p>
      </div>
      {currentReviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <div className="review-author">
              <img src={UserIcon} alt="User Icon" className="user-icon" />
              <h4>{review.name}</h4>
              <div className="stars">{renderStars(review.rating)}</div>
            </div>
          </div>
          <h3>{review.title}</h3>
          <p>{review.review}</p>
          {/* Only render images if the review has them */}
          {review.images && review.images.length > 0 && (
            <div className="review-images">
              {review.images.map((img, index) => (
                <img key={index} src={img} alt={`Review ${index + 1}`} />
              ))}
            </div>
          )}
          <hr className="review-divider" />
        </div>
      ))}
      {/* Render Pagination */}
      {renderPagination()}
    </section>
  );
};

export default CustomerReviews;
