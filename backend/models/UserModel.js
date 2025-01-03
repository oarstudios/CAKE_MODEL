const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')


const UserModel = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    userType: {
        type: String, 
        required: true,
        enum: ["User", "Admin"]
    }
}, {timestamps: true});

UserModel.statics.signup = async function(username, email, phoneNumber, password, address, age, gender, userType)
{
    if(!username || !email || !phoneNumber || !password || !address || !age || !gender || !userType)
    {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email))
    {
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password))
    {
        throw Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    }

    const userExists = await this.findOne({email})
    if(userExists)
    {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        username, 
        email,
        phoneNumber,
        password: hash,
        address,
        age,
        gender,
        userType
    })

    return user;


}

UserModel.statics.login = async function(username, email, password)
{
    if(!username || !email || !password)
    {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if(!user)
    {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match)
    {
        throw Error('Incorrect Password')
    }

    return user;    
}

module.exports = mongoose.model('User', UserModel);