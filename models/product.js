const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: false },
    price: {
        type: String,
        required: true
    },
    description: { type: String, required: false },
    category: { type: String, required: false },
    stock: { type: String, required: false },
    image: {
        type: String, required: false
    },
    alt: { type: String, required: false }


})

const Product = mongoose.model('Product', productSchema)

module.exports = Product