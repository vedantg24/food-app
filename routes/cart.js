const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

const User = require('../models/User');

// @route   POST api/cart
// @desc    Add items to cart
// @access  Private
router.post(
    '/',
    auth,
    async(req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.user.id,
                {$push: {'cart': req.body}},
                {
                    new: true,
                    runValidators: true
                }
            );
            res.json(user.cart); 
        } catch (err) {
            console.log(err.message);
        res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/cart
// @desc    Get all items from cart
// @access  Private
router.get(
    '/',
    auth,
    async(req, res) => {
        
        try {
            const user = await User.findById(req.user.id);
            res.json(user.cart); 
        } catch (err) {
            console.log(err.message);
        res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/cart
// @desc    Delete items from cart
// @access  Private
router.delete(
    '/',
    auth,
    async(req, res) => {
        
        try {
            const user = await User.findByIdAndUpdate(
                req.user.id,
                {$pull: {'cart': req.body}},
                {
                    new: true,
                    runValidators: true
                }
            );
            res.json(user); 
        } catch (err) {
            console.log(err.message);
        res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/cart/buy
// @desc    Buy items and add those items to cart history
// @access  Private
router.get(
    '/buy',
    auth,
    async(req, res) => {
        
        try {
            const user = await User.findById(req.user.id);
            const user2 = await User.findByIdAndUpdate(
                req.user.id,
                {$set: {'cart': []},
                 $push: {'cartHistory': user.cart }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            res.json(user2); 
        } catch (err) {
            console.log(err.message);
        res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
