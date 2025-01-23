const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (id) =>{
  return jwt.sign({id}, process.env.SECRET, {expiresIn: '30d'})
} 


const signupUser = async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const user = await User.signup(username, email, password, userType);
    const token = createToken(user._id);
    res.status(200).json({user: user, token: token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if(!user){
      return res.status(404).json("User not found")
  }
    const token = createToken(user._id);
    res.status(200).json({user: user, token: token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async(req, res) =>{
  const {id} = req.params 
  try{
    const user = await User.findById(id)
    if(!user)
    {
      return res.status(404).json("User not found")
    }
    res.status(200).json(user)
  }catch(error){
    res.status(400).json({ error: error.message });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      return res.status(404).json("User not found");
    }
    // const token = createToken(user._id);
    res.status(200).json({user: user});
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity, weight } = req.body;

  try {
    const product = await Product.findById(productId);
    console.log(productId, quantity, weight)
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
      user.cart[cartItemIndex].weight = weight;
    } else {
      user.cart.push({ product: productId, quantity, weight });
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    user.cart.splice(cartItemIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity, weight } = req.body;

  try {
    const product = await Product.findById(productId);
    console.log(productId, quantity, weight)
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity = quantity;
      user.cart[cartItemIndex].weight = weight;
    } else{
      return res.status(404).json({ message: "Product not found" });
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Product updated in the cart", cart: user.cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  addToCart,
  updateCart,
  removeFromCart,
  getUserById
};
