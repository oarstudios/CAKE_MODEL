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

        const newCTW = await CTW.create({ product });
        res.status(201).json(newCTW);
    } catch (error) {
        res.status(500).json({ message: 'Error creating CTW', error: error.message });
    }
};

// Get all CTW entries
const getAllCTWs = async (req, res) => {
    try {
        const ctwEntries = await CTW.find().populate('product'); // Populating product details
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
        const { id } = req.params;

        const deletedCTW = await CTW.findByIdAndDelete(id);

        if (!deletedCTW) {
            return res.status(404).json({ message: 'CTW entry not found' });
        }

        res.status(200).json({ message: 'CTW entry deleted successfully' });
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
