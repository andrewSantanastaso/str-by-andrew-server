const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const verifyToken = require('../middleware/verify-token')


router.post('/:userId/:productId', async (req, res, next) => {

    try {

        const userId = await User.findOne({ userId: req.params._id })
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            await Cart.create({
                userId: userId,
                products: []
            })
        }
        const item = await Product.findOne({ productId: req.params._id });
        if (item) {
            cart.products.push(item)
            res.status(201).json(cart)
            await cart.save()





            // else {
            //     res.status(404).json({ message: "User not found" })
            // }
            // if (item) {
            //     res.status(200).json(item);

        } else {
            res.status(404).json({ message: "Product not found" });
        }



    } catch (error) {
        console.error({ error: error.message });

    }
});

router.get('/:userId', async (req, res) => {
    try {
        const userId = await User.findOne({ userId: req.params._id })
        const userCart = await Cart.findOne({ userId })


        res.status(201).json(userCart)
    } catch (error) {
        console.error({ error: error.message })
    }
})

module.exports = router