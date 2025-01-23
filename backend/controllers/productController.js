const Product = require('../models/ProductModel');

// Add a new product
const addProduct = async (req, res) => {
    const { title, description, bestseller, itemInStock, category, prices, defaultPrice } = req.body;

    // If productImages is provided as a JSON array, use it; otherwise, use files uploaded via multer
    const productImages = req.body.productImages || req.files?.map(file => file.originalname);

    try {
        // Parse the prices field if it's sent as a JSON string
        const parsedPrices = typeof prices === 'string' ? JSON.parse(prices) : prices;

        const product = await Product.create({
            title,
            description,
            bestseller,
            itemInStock,
            category,
            productImages,
            prices: parsedPrices,
            defaultPrice // Add weight-price pairs
        });

        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product Not Found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        // Handle file uploads
        if (req.files && req.files.length > 0) {
            const images = req.files.map(file => file.originalname); // Store original filenames in DB
            data.productImages = images;
        }

        // Parse the prices field if it's sent as a JSON string
        if (data.prices && typeof data.prices === 'string') {
            data.prices = JSON.parse(data.prices);
        }

        // Update the product
        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!product) {
            return res.status(404).json({ error: 'Product Not Found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ error: 'Product Not Found' });
        }

        res.status(200).json({ message: 'Deleted product successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
