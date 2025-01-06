const express = requrie('express')
const mongoose = require('mongoose')

const ReviewsModel = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    reviews:[
        {
            username: {
                type: String,
                required: true
            },
            review:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                min: 1,
                max: 5,
                required: true
            },

            // media:[{
            //     type: String
            // }]
        }
    ]
})

module.exports = mongoose.model('Reviews', ReviewsModel)