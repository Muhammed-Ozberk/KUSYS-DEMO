// Importing necessary modules
const config = require('../config/config'); // Importing the configuration containing JWT secret key
const jwt = require('jsonwebtoken'); // Importing the JWT library

// Middleware function for JWT authentication
module.exports = (req, res, next) => {
    let token = req.headers['authorization']; // Extracting the token from the Authorization header

    // Checking if the token is missing
    if (!token) {
        res.status(401).json({
            status: false,
            error: 'Token not found',
            data: null
        });
    } else {
        token = token.replace('Bearer ', ''); // Removing 'Bearer ' prefix from the token

        // Verifying the token using the secret key from the config
        jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
            if (err) {
                // Responding with an error if the token is not valid
                res.status(401).json({
                    status: false,
                    error: 'Token not valid',
                    data: null
                });
            } else {
                // Attaching the decoded token payload to the request object
                req.decoded = decoded;
                next(); // Allowing the request to proceed to the next middleware or route handler
            }
        });
    }
};
