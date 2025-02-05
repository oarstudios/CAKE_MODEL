const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const upload2 = require('../middlewares/uploadProduct');  // Correct import

const router = express.Router();

// Add reqAuth middleware for the admin if needed

router.post('/addproduct', upload2, addProduct);  // Use upload2 here

router.get('/getallproducts', getAllProducts);

router.get('/getproductbyid/:id', getProductById);

router.put('/updateproduct/:id', upload2, updateProduct);

router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;