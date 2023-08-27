var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.userList);

/* GET user detail. */
router.get('/:id', userController.userDetail);

/* POST user create. */
router.post('/create', userController.userCreate);

/* POST user update. */
router.post('/update/:id', userController.userUpdate);

/* GET user delete. */
router.get('/delete/:id', userController.userDelete);

module.exports = router;