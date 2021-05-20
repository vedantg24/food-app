const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

exports.auth = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
    
    //Check if token exists
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = await User.findById(decoded.user.id);

        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

//Grant access to specific roles
exports.authorize = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)) {
            return (`User role ${req.user.role} is not authorizes to access this route`, 403);
        }
        next();
    }
}