const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

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

const loginUser = async(req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password)
        if(!user)
        {
           return res.status(404).json("User not found")
        }

        const token = createToken(user._id)
        res.status(200).json({user: user, token: token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getUsers = async(req, res)=>{
    try{
        const users = await User.find({}).sort({createdAt: -1})
        res.status(200).json({users})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

const getUserById = async(req, res) =>{
    const {id} = req.params
    try{
        const user = await User.findById(id)
        if(!user)
        {
            return res.status(404).json("User not found")
        }

        res.status(200).json({user})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const updateUser = async(req, res) =>{
    const data= req.body
    const {id} = req.params
    try{
        const user = await User.findByIdAndUpdate(id, data, {new:  true})
        if(!user)
        {
            return res.status(404).json('User not found')
        }
        res.status(200).json({user: user})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteUser = async(req, res)=>{
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id)
        if(!user)
        {
            res.status(404).json("User not found")
        }
        res.status(200).json({user: user})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser, getUsers, getUserById, updateUser, deleteUser};