const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [],
    total: Number
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart