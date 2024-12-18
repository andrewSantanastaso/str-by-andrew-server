require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
const verifyToken = require('./middleware/verify-token')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const cartsRouter = require('./controllers/carts')


mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB')
})
mongoose.connection.on('error', () => {
    console.error('Error connecting to mongoDB')
})
app.use(cors())

app.use(express.json())

app.use('/', usersRouter)
app.use('/', productsRouter)
app.use('/cart', cartsRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})