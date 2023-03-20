const express = require('express');
const productCreate = require('../Controller/product.controller')
const router = express.Router();
const productValidator = require('../Middlewares/requestValidors');
const tokenValidator = require('../Middlewares/AuthValidator');


router.post('/create', tokenValidator.validateUser, tokenValidator.isAdmin, productValidator.validateProductRequests, productCreate.addProduct);
//router.get('/productByName/:name', productCreate.fetchProductByName);
router.get("/products", productCreate.fetchAllProducts);
router.get('/productByCategoryId/:categoryId', productCreate.fetchProductByCategoryId);
router.get('/search', productCreate.search)

module.exports = router;