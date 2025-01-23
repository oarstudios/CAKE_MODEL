const express = require('express')
const {signupUser, loginUser, getUsers, getUserById, updateUser, deleteUser, addToCart, removeFromCart, updateCart} = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/getusers', getUsers)

router.get('/getuserbyid/:id', getUserById)

router.patch('/updateuser/:id', updateUser)

router.delete('/deleteuser:id', deleteUser)

router.post('/addtocart/:id', addToCart)

router.delete('/removefromcart/:id', removeFromCart)

router.patch('/updatecart/:id', updateCart)

module.exports = router;