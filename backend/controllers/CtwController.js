const CTW = require('../models/CakeOfTheWeek')
const Product = require('../models/ProductModel');

// Create a new CTW entry
const createCTW = async (req, res) => {
    try {
        const { product } = req.body;

        // Ensure the product exists
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if a Cake of the Week entry already exists
        const existingCTW = await CTW.findOne();

        if (existingCTW) {
            // Update the existing entry instead of creating a new one
            existingCTW.product = product;
            await existingCTW.save();
            return res.status(200).json({ message: "Updated Cake of the Week", data: existingCTW });
        }

        // If no previous entry exists, create a new one
        const newCTW = await CTW.create({ product });
        res.status(201).json({ message: "New Cake of the Week created", data: newCTW });
    } catch (error) {
        res.status(500).json({ message: 'Error updating CTW', error: error.message });
    }
};

// Get all CTW entries
const getAllCTWs = async (req, res) => {
    try {
        // Fetching all CTW entries, populating the 'product' field, and sorting by 'createdAt' in descending order
        const ctwEntries = await CTW.find()
            .sort({ createdAt: -1 }); // Sorting by 'createdAt' in descending order to get latest first

        if (!ctwEntries.length) {
            return res.status(404).json({ message: 'No CTW entries found' });
        }

        res.status(200).json(ctwEntries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching CTW entries', error: error.message });
    }
};

// Get a single CTW entry by ID
const getCTWById = async (req, res) => {
    try {
        const { id } = req.params;
        const ctwEntry = await CTW.findById(id).populate('product');

        if (!ctwEntry) {
            return res.status(404).json({ message: 'CTW entry not found' });
        }

        res.status(200).json(ctwEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching CTW entry', error: error.message });
    }
};

// Update a CTW entry
const updateCTW = async (req, res) => {
    try {
        const { id } = req.params;
        const { product } = req.body;

        // Ensure the product exists
        if (product) {
            const existingProduct = await Product.findById(product);
            if (!existingProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
        }

        const updatedCTW = await CTW.findByIdAndUpdate(
            id,
            { product },
            { new: true, runValidators: true }
        ).populate('product');

        if (!updatedCTW) {
            return res.status(404).json({ message: 'CTW entry not found' });
        }

        res.status(200).json(updatedCTW);
    } catch (error) {
        res.status(500).json({ message: 'Error updating CTW entry', error: error.message });
    }
};

// Delete a CTW entry
const deleteCTW = async (req, res) => {
    try {
        const { product } = req.body;

        // Find and delete the CTW entry by the product's ID
        const deletedCTW = await CTW.findOneAndDelete({ product: product });

        if (!deletedCTW) {
            return res.status(404).json({ message: 'CTW entry not found for the given product' });
        }

        res.status(200).json({ message: 'CTW entry deleted successfully for the product' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting CTW entry', error: error.message });
    }
};


module.exports = {
    createCTW,
    getAllCTWs,
    getCTWById,
    updateCTW,
    deleteCTW,
};
