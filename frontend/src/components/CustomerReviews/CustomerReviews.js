import React, { useEffect, useState } from 'react';
import './CustomerReviews.css';

// Import the images
import FullStar from '../../images/NoRating.png';
import EmptyStar from '../../images/Rating.png';
import UserIcon from '../../images/user.png'; // Generic user icon
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const CustomerReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Display 5 reviews per page
  const { id } = useParams();
  const [reviews, setReviews] = useState([]); // Initialize reviews as an empty array
  const [averageRating, setAverageRating] = useState(0); 


  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/getproductreview/${id}`);
      const json = await response.json();

      console.log(json); // Log the structure of the response to confirm

      // Ensure that 'reviews' is an array before setting the state
      if (Array.isArray(json?.reviews?.reviews)) {
        setReviews(json.reviews);
        calculateAverageRating(json?.reviews?.reviews);
      } else {
        console.error("Reviews data is not an array:", json.reviews);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [product, setProduct] = useState('')

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/getproductbyid/${id}`);
      const json = await response.json();

      console.log(json); // Log the structure of the response to confirm
      setProduct(json)
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews?.reviews?.length === 0) return 0;
    const totalRating = reviews?.reviews?.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews?.reviews?.length).toFixed(0); // Return 1 decimal place
  };

  useEffect(() => {
    fetchReviews();
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setAverageRating(calculateAverageRating(reviews));
  }, [reviews]);

  // Calculate the current reviews to display based on the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.reviews?.slice(indexOfFirstReview, indexOfLastReview);

  // Fetch reviews on component mount or when `id` changes
  useEffect(() => {
    fetchReviews();
    fetchProduct();
  }, [id]); // Dependency on `id` so it fetches when `id` changes

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
    for (let i = 1; i <= Math.ceil(reviews?.reviews?.length / reviewsPerPage); i++) {
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
      <h2>Customer Reviews ({reviews?.reviews?.length})</h2>
      <div className="rating-summary">
      <div className="stars">{renderStars(Math.round(averageRating))}</div>
        <p>{averageRating > 0 ? averageRating : 0}  out of 5</p>
      </div>

      {/* Conditional rendering: Only display reviews if they are available */}
      {reviews?.reviews?.length > 0 ? (
        currentReviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="review-author">
                <img src={UserIcon} alt="User Icon" className="user-icon" />
                <h4>{review.username}</h4>
                <div className="stars">{renderStars(review.rating)}</div>
              </div>
            </div>
            <h3>{product?.product?.title}</h3>
            <p>{review.review}</p>
            {/* Only render images if the review has them */}
            {review?.media && review?.media?.length > 0 && (
              <div className="review-images">
                {console.log(review?.media)}
                {review?.media?.map((img, index) => (
                  <img key={index} src={`http://localhost:3001/${img}`} alt={`Review ${index + 1}`} />
                ))}
              </div>
            )}
            <hr className="review-divider" />
          </div>
        ))
      ) : (
        <p>No reviews</p>
      )}

      {/* Render Pagination */}
      {renderPagination()}
      {/* <ToastContainer/> */}
    </section>
  );
};

export default CustomerReviews;
