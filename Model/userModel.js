const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
