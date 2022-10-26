const router = require('express').Router();
const authController = require('./authController');

router.post('/register', authController.register);

module.exports = router;