const express = require('express')
const {signupUser, loginUser, getUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/getusers', getUsers)

router.get('/getuserbyid/:id', getUserById)

router.patch('/updateuser/:id', updateUser)

router.delete('/deleteuser:id', deleteUser)

module.exports = router;