const dbConnections = require("./dbConnection");
const defineCategory = require("../Models/category.model")
    /*

    Things to be Done in Category Repository:-
    1. Write a function to create a Row in Category Table
    2. Write a function to select a Row in Category Table
    3. Write a function to Update a Row in Category Table
    4. Write a function to Delete a Row in Category Table
    5. Write a function to Show a list of Categories in Category Table

    */

const Category = defineCategory(dbConnections.connection, dbConnections.DataTypes);


//We Need to Create Table to do All CRUD 

const categoryTableCreation = async(forceCreation) => { //forecreation will reCreate table every time and clean up old stuffs
    await Category.sync({ force: forceCreation })
}

//1. Write a function to create a Row in Category Table

const save = async(category) => {
    return await Category.create({
        name: category.name,
        description: category.description
    });
}

// 2. Write a function to select a Row in Category Table

const fetchCategoryById = async(id) => {
    return await Category.findByPk(id)
}

// 5. Write a function to Show a list of Categories in Category Table

const fetchAllCategories = async() => {
    return await Category.findAll()
}

// Write a function to Find By Criteria

const fetchCategoriesByCriteria = async(criteria) => { //We USe this Method When All Needful Function already Present
    return await Category.findAll(criteria)
}

module.exports = {
    tableCreation: categoryTableCreation,
    createCategory: save,
    fetchById: fetchCategoryById,
    fetchAll: fetchAllCategories,
    fetchByCriteria: fetchCategoriesByCriteria
}