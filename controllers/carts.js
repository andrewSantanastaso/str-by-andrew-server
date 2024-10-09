const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const verifyToken = require('../middleware/verify-token')


router.post('/:userId/:productId', async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let cart = await Cart.findOne({ userId: user._id });
        if (!cart) {
            cart = await Cart.create({
                userId: user._id,
                products: []
            });
        }

        const item = await Product.findById(req.params.productId);
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
        const foundUser = await User.findById(req.params.userId)
        const userCart = await Cart.findOne({ userId: foundUser })


        res.status(201).json(userCart)
    } catch (error) {
        console.error({ error: error.message })
    }
})

module.exports = router