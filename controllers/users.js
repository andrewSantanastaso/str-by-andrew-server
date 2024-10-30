const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Cart = require('../models/cart')
const verifyToken = require('../middleware/verify-token')

const SALT_LENGTH = 12

router.post('/sign-up', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username })
        const existingEmail = await User.findOne({ email: req.body.email })
        if (existingEmail || existingUser) {
            return res.json({ error: "Username or email already in use." })
        }
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)

        })
        const token = jwt.sign({
            username: user.username, _id: user._id
        }, process.env.JWT_SECRET)


        res.status(201).json({ user, token })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})



router.post('/sign-in', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign({
                username: user.username, name: user.name, _id: user._id, isAdmin: user.isAdmin
            }, process.env.JWT_SECRET)

            res.status(200).json({ user, token })

        }
        else {
            res.status(401).json({ error: 'Invalid username or password' })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})
// router.get('/sign-in', async (req, res) => {
//     try {
//         const user = await User({ findOne: req.body.username })
//         res.status(200).json({ user })
//     } catch (error) {
//         res.status(401).json({ error: error.message })

//     }
// })

router.post('/admin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user && user.isAdmin && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign({
                username: user.username, _id: user
            }, process.env.JWT_SECRET)

            res.status(200).json({ user, token })

        }
        else if (!user.isAdmin) {
            res.status(403).json({ error: 'User is not an administrator' })
        }



        else {
            res.status(401).json({ error: 'Invalid username or password' })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

module.exports = router