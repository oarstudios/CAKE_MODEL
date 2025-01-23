const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bestseller: {
      type: Boolean,
    },
    itemInStock: {
      type: Boolean,
      default: true,
    },
    productImages: [
      {
        type: String,
        required: true,
      },
    ],
    defaultPrice:{
        type: String,
    },
    // New field for weight-price pairs
    prices: [
      {
        weight: {
          type: String, // e.g., "1/2kg", "1kg", "2kg"
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    category:{
        type: String,
        required: true,
        enum: ["cake", "chocolate", "gifting"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
