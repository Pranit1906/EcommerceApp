const dbConnection = require('./dbConnection');
const defineCategory = require('../Models/category.model');
const { defineProduct } = require('../Models/product.model');

const Product = defineProduct(dbConnection.connection, dbConnection.DataTypes)

//because we have a foreign key relationship, we need the other table also
//Link: https://sebhastian.com/sequelize-foreign-key/
const createProductTable = async(forceCreation) => {
    const Category = defineCategory(dbConnection.connection, dbConnection.DataTypes);
    Product.belongsTo(Category, {
        foreignKey: "categoryId",
        targetKey: "id",
    });
    await Product.sync({ force: forceCreation });
}

const productCreation = async(product) => {
    return await Product.create({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        categoryId: product.categoryId
    })
}

//const createMultipleProducts = async(products) => {

//}

const fetchProductByAllCriteria = async(criteria) => {
    return await Product.findAll(criteria)
}

const fetchProductById = async(id) => {
    return await Product.findByPK(id);
}


const findAllProducts = async() => {
    return await Product.findAll();
}

const fetchProductByCategoryId = async(categoryId) => {
    return await Product.findAll(categoryId);
}
module.exports = {
    Product: Product,
    createProductTable: createProductTable,
    productCreation: productCreation,
    fetchProductById: fetchProductById,
    findAllProducts: findAllProducts,
    fetchProductByCategoryId: fetchProductByCategoryId,
    fetchProductByAllCriteria: fetchProductByAllCriteria
}