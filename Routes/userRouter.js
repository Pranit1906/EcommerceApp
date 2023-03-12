const express = require('express');
const userController = require('../Controller/user.controller');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.login);

module.exports = router;