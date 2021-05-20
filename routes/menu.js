const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');

const MenuItems = require('../models/MenuItems');

// @route   GET api/menu/:restaurantid
// @desc    Get all menu items of a restaurant by restaurantid
// @access  Public
router.get('/:id', async(req, res) => {
    
    try {
        const items = await MenuItems.find({ restaurant: req.params.id});
        
        res.json({items}); 
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/menu
// @desc    Create menu items
// @access  Private/Admin
router.post(
    '/',
    auth,
    authorize('admin'),
    [
        check('name', 'Please add a name').not().isEmpty(),
        check('cost', 'Please add a cost').not().isEmpty()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const items = await MenuItems.create(req.body);
            res.json(items);  
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
});

// @route   PUT api/menu/:id
// @desc    Update menu items
// @access  Private/Admin
router.put(
    '/:id',
    auth,
    authorize('admin'),
    async(req, res) => {

        try {
            const items = await MenuItems.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
 
            res.json(items);  
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
});

// @route   DELETE api/menu/id
// @desc    Delete a menu item
// @access  Private/Admin
router.delete(
    '/:id',
    auth,
    authorize('admin'),
    async(req, res) => {

        try {
            await MenuItems.findByIdAndDelete(req.params.id);

            res.json('Item removed'); 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
