const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mob_no:{
        type: String,
        required: true,
        maxlength: 10
    },
    address: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: [],
    cartHistory: [],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('user', UserSchema);