const mongoose = require('mongoose')

const BillingModel = mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
         // required: true,
    },
    productIds:[
        {
            product:{
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                 // required: true,
            },
            quantity: {
                type: Number,
                // required: true,,
                default: 1,
                min: 1
            },
            weight: {
                type: String,
                // required: true,
            }
        }
    ],
    email: {
        type: String,
        // required: true,
    },
    shippingAddress:{
        firstName: {
            type: String,
            // required: true,
        },
        lastName: {
            type: String,
            // required: true,
        },
        address:{
            type: String,
            // required: true,
        },
        landmark:{
            type: String,
            // required: true,
        },
        state:{
            type: String,
            // required: true,
        },
        city:{
            type: String,
            // required: true,
        },
        pincode:{
            type: Number,
            // required: true,
        },
        phoneNo:{
            type: Number,
            // required: true,
        }
    },
    billingAddress:{
        firstName2: {
            type: String,
            // required: true,
        },
        lastName2: {
            type: String,
            // required: true,
        },
        address2:{
            type: String,
            // required: true,
        },
        landmark2:{
            type: String,
            // required: true,
        },
        state2:{
            type: String,
            // required: true,
        },
        city2:{
            type: String,
            // required: true,
        },
        pincode2:{
            type: Number,
            // required: true,
        },
        phoneNo2:{
            type: Number,
            // required: true,
        }
    }
})

module.exports = mongoose.model('Billing', BillingModel)