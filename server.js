require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB')
})
mongoose.connection.on('error', () => {
    console.error('Error connecting to mongoDB')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})