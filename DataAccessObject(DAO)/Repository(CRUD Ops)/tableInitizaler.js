const categoryRepository = require("./category.repository")
const productRepository = require('./product.repository.js');
const userRepository = require("./user.repository");

exports.initializeTables = (forceCreation) => {
    categoryRepository.tableCreation(forceCreation);
    productRepository.createProductTable(forceCreation);
    userRepository.userTableCreator(forceCreation);
}