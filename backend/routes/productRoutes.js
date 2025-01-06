const express = require('express')
const {addProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/productController')
const upload = require('../middlewares/upload')

const router = express.Router()

//add reqAuth middleware for the admin

router.post('/addproduct', upload, addProduct)

router.get('/getallproducts', getAllProducts)

router.get('/getproductbyid/:id', getProductById)

router.put('/updateproduct/:id', upload, updateProduct)

router.delete('/deleteproduct/:id', deleteProduct)

module.exports = router