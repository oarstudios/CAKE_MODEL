const mongoose = require('mongoose')

const CtwModel = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps: true})

module.exports = mongoose.model('CTW', CtwModel);