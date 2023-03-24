const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cart.controller');
const tokenValidator = require('../Middlewares/AuthValidator');

router.post('/create',tokenValidator.validateUser,cartController.createCart);
router.put('/update/:id',cartController.update);
router.get('/getCart/:id',cartController.getCart);

module.exports = router;