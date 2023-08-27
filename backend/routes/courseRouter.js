var express = require('express');
var router = express.Router();
const coursesController = require('../controllers/courseController');

/* GET courses listing. */
router.get('/', coursesController.courseList);

/* GET match listing. */
router.get('/match', coursesController.matchList);

/* POST courses create. */
router.post('/create', coursesController.matchCreate);


module.exports = router;