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
            const foundProduct = cart.products.find((p) => {
                return p.product._id.toString() === req.params.productId
            })
            console.log(foundProduct)
            if (foundProduct) {
                foundProduct.quantity++
            }
            else {
                cart.products.push({
                    product: item,
                    quantity: 1

                })
            }




            await cart.save()
            res.status(201).json(cart)





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
        const userCart = await Cart.findOne({ userId: foundUser._id })


        res.status(201).json(userCart)
    } catch (error) {
        console.error({ error: error.message })
    }
})

router.delete('/:userId/:productId/delete', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.userId)
        const foundCart = await Cart.findOne({ userId: foundUser._id })
        const foundProductsInCart = foundCart.products

        const newCart = foundProductsInCart.filter((item) => {
            console.log(item.product._id, req.params.productId)
            return item.product._id.toString() !== req.params.productId
        })

        const update = {
            products: newCart
        }
        await Cart.findByIdAndUpdate(foundCart._id, update, { new: true })
        res.status(201).json(newCart)
    } catch (error) {
        console.error({ error: error.message })
    }
})

module.exports = router