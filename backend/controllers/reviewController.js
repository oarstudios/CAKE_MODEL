const Reviews = require("../models/ReviewsModel");

// Add a new review to a product
const addReview = async (req, res) => {
  const { username, review, rating } = req.body;
  const { productId } = req.params;

  try {
    let reviews = await Reviews.findOne({ productId });

    if (!reviews) {
      // If no reviews exist for the product, create a new document
      reviews = new Reviews({
        productId,
        reviews: [{ username, review, rating }],
      });
    } else {
      // Add the new review to the existing reviews array
      reviews.reviews.push({ username, review, rating });
    }

    await reviews.save();

    res.status(200).json({ message: "Review added successfully", reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews for a specific product
const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Reviews.findOne({ productId }).populate("productId", "name");

    if (!reviews) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific review
const updateReview = async (req, res) => {
  const { productId, reviewId } = req.params;
  const { review, rating } = req.body;

  try {
    const reviews = await Reviews.findOne({ productId });

    if (!reviews) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    const reviewToUpdate = reviews.reviews.id(reviewId);
    if (!reviewToUpdate) {
      return res.status(404).json({ message: "Review not found" });
    }

    reviewToUpdate.review = review || reviewToUpdate.review;
    reviewToUpdate.rating = rating || reviewToUpdate.rating;

    await reviews.save();

    res.status(200).json({ message: "Review updated successfully", reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific review
const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;

  try {
    const reviews = await Reviews.findOne({ productId });

    if (!reviews) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    const reviewToDelete = reviews.reviews.id(reviewId);
    if (!reviewToDelete) {
      return res.status(404).json({ message: "Review not found" });
    }

    reviewToDelete.remove();
    await reviews.save();

    res.status(200).json({ message: "Review deleted successfully", reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews for all products
const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Reviews.find({}).populate("productId", "name");

    if (allReviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json({ reviews: allReviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
  getAllReviews,
};
