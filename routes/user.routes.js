var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller'); 
var authMiddlewares = require('../middlewares/auth.middlewares');

router.get('/',controller.index);
router.get('/creative',controller.creative);
router.get('/search',controller.search);
router.get('/:id',controller.getID);
router.post('/creative',controller.postCreat);

module.exports = router;