const mongoose = require('mongoose')
const Product = require('./product')
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{
        product: Product.schema,
        quantity: Number
    }],
    total: Number
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart