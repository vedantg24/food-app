const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');

const Restaurant = require('../models/Restaurant');

// @route   GET api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', async(req, res) => {
    
    try {
        const restaurant = await Restaurant.find();
        res.json(restaurant); 
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/restaurants/:id
// @desc    Get a single restaurant
// @access  Public
router.get('/:id', async(req, res) => {
    
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.json(restaurant); 
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/restaurants
// @desc    Create a new restaurant
// @access  Private/Admin
router.post(
    '/',
    [
        check('name', 'Please add a name').not().isEmpty(),
        check('email', 'Please add an email').isEmail(),
        check('address', 'Please add an address').not().isEmpty(),
    ],
    auth,
    authorize('admin'),
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const restaurant = await Restaurant.create(req.body);
            res.json(restaurant); 
        } catch (err) {
            console.log(err.message);
        res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/restaurants/id
// @desc    Update restaurant
// @access  Private/Admin
router.put(
    '/:id',
    auth,
    authorize('admin'),
    async(req, res) => {

        try {
            const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            res.json(restaurant); 
        } catch (err) {
            console.log(err.message);
        res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/restaurants/id
// @desc    Delete restaurant
// @access  Private/Admin
router.delete(
    '/:id',
    auth,
    authorize('admin'),
    async(req, res) => {

        try {
            await Restaurant.findByIdAndDelete(req.params.id);

            res.json('Restaurant removed'); 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
