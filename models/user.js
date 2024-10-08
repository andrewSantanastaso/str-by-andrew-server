const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true
    },
    userCart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    isAdmin: { type: Boolean, default: false, required: true }

})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});


const User = mongoose.model('User', userSchema)

module.exports = User