const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const verifyToken = require('../middleware/verify-token')

router.get('/products', async (req, res) => {
    try {
        const allProducts = await Product.find({})
        // const user = await User.findById(req.params.userId)
        // if (!user) {
        //     res.status(404)
        //     throw new Error('Please sign in to continue')
        // }
        // if (req.user._id !== req.params.userId) {
        //     return res.status(401).json({ error: "Unauthorized" })
        // }
        // const cart = user.cart
        res.status(201).json({ allProducts })


    } catch (error) {
        // if (res.statusCode === 404) {
        //     res.status(404).json({ error: error.message });
        // } else {
        //     res.status(500).json({ error: error.message });
        // }
        res.status(400).json({ error: error.message })
    }
})
router.get('/:productId', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.productId)
        if (foundProduct) {
            res.status(201).json(foundProduct)
        }
        else {
            res.status(404).json("Product Not Found")
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
router.post('/new-product', async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock,
            image: req.body.image,
            alt: req.body.alt
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
router.put('/edit/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
        // const user = await User.findById(req.params.userId)
        // // if (!user) {
        //     res.status(404)
        //     throw new Error('Please sign in to continue')

        // if (req.user._id !== req.params.userId) {
        //     return res.status(401).json({ error: "Unauthorized" })
        // }

        res.status(201).json(product)



    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });

        } else {
            res.status(500).json({ error: error.message });
        }
    }


})


router.delete('/delete/:productId', async (req, res) => {
    try {
        const productToDelete = await Product.findByIdAndDelete(req.params.
            productId)

        res.status(201).json('Deleted')
    } catch (error) {
        res.status(404).json('Unable to find and delete product')
    }
})

module.exports = router