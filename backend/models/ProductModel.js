const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    itemInStock:{
        type: Boolean,
        default: true
    },
    productImages: [{
        type: String,
        // required: true
    }]
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)