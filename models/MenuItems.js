const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');

const MenuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    cost: {
        type: String,
        required: true
    },
    quantity: {
        type: String
    },
    image:{
        type: String
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant
    }
});

module.exports = mongoose.model('menuItems', MenuItemSchema);