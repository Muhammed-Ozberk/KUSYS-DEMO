var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');



/* /login POST */
router.post('/login', authController.login);


module.exports = router;