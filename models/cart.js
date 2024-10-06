const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total: Number
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart