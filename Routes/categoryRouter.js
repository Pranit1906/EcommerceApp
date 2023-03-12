const express = require('express');
const router = express.Router();
const categoryCreate = require('../Controller/category.controller');
const categoryValidator = require('../Middlewares/requestValidors')

router.post('/create', categoryValidator.validateCategoryRequests, categoryCreate.categoryCreation);
router.get('/categoryByName/:name', categoryCreate.fetchByName);
router.get('/categories', categoryCreate.fetchAllCategory);
router.get('/:categoryId', categoryCreate.fetchById);


module.exports = router