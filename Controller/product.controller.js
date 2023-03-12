const productRepository = require('../DataAccessObject(DAO)/Repository(CRUD Ops)/product.repository.js');
const errorConstants = require('../Constants/errorConstants');
const { Op } = require('sequelize');
const addProduct = (req, res) => {

    if (!req.body.name || !req.body.categoryId) {
        return res.status(400).send({
            message: 'Name or CategoryId Cannot be Null'
        })
    }

    productRepository.productCreation({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            categoryId: req.body.categoryId
        })
        .then(result => {
            console.log('Product Added Successfully')
            res.status(201).send(result)
        })
        .catch(error => {
            if (error.name === errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR) {
                return res.status(400).send({
                    message: `Product Name :-${req.body.name} Already Exists!`
                });
            }
            throw error;
        })
        .catch(error => {
            if (error.name === errorConstants.FOREIGN_KEY_CONSTRAINT_VALIDATION_ERROR) {
                console.log(`Invalid CategoryId :-${req.body.categoryId}`)
                return res.status(400).send({
                    message: 'CategoryId Already Exists!'
                });
            }
            throw error
        })
        .catch(error => {
            console.log('Error Occured in Creation of Product', error);
            return res.status(500).send({
                message: 'Error Occured In Product Creation!'
            })
        })
}

//---------------------------------------------Fetch Product By Name-------------------------------------------------

const fetchProductByName = (req, res) => {
    productRepository.fetchProductByAllCriteria({
            where: {
                name: req.params.name
            }
        })
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Result Not Found!"
                })
            }
            console.log('Product Fetched By Name SuccessFully!');
            return res.status(200).send(result)
        })
        .catch(error => {
            console.log('Error Occured In Fetching Product By Name', error);
            return res.status(500).send({
                message: "Error Occured in Fetching Product By Name"
            })
        })
}

//--------------------------------------fetch Product By Price Range------------------------------------------

const fetchProductByCategoryId = (req, res) => {
    let criteria
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;


    if (minPrice & maxPrice) {
        criteria = {
            where: {
                [Op.and]: [{
                        categoryId: req.params.categoryId
                    },
                    {
                        price: {
                            [Op.between]: [minPrice, maxPrice]
                                // [Op.gte]: minPrice,
                                // [Op.lte]: maxPrice
                        }
                    }
                ]
            },
            //Applying Sorting BAsed On Properties Like Price         
            order: [
                ["price", "DESC"]
            ]
        }
    } else {
        criteria = {
            where: {
                categoryId: req.params.categoryId
            }
        }
    }
    productRepository.fetchProductByAllCriteria(criteria)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Result Not Found!"
                })
            }
            console.log('Product Fetched By CategoryId SuccessFully!');
            return res.status(200).send(result)
        })
        .catch(error => {
            console.log('Error Occured In Fetching Product By CategoryId', error);
            return res.status(500).send({
                message: "Error Occured in Fetching Product By CategoryId"
            })
        })
}

//-------------------------------Fetch Product By Searching By Keywords-----------------------------------------

const search = (req, res) => {
    const keyword = req.query.search; //String Input Example:-'Iphone 11'
    const keywords = keyword.split(' '); // o/p ==> ['Iphone', '11']keyword.split will split words in keyword baesd on (' ') Spaces..
    const likeKeywords = [];
    let criteria;

    for (let i = 0; i < keywords.length; i++) {
        likeKeywords[i] = {
                'name': {
                    [Op.like]: `%${keywords[i]}%`
                }
            } // likeKeyWords = [{name:{Symbol(like):'%Iphone%'}}, {name:{Symbol(like):'%11%'}}]
    }

    criteria = {
        where: {
            [Op.and]: likeKeywords
        }
    }

    productRepository.fetchProductByAllCriteria(criteria)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Result Not Found!"
                })
            }
            console.log('Product Fetched By Searching On Keywords SuccessFully!');
            return res.status(200).send(result)
        })
        .catch(error => {
            console.log('Error Occured In Searching Product By Name', error);
            return res.status(500).send({
                message: "Error Occured in Searching Product By Name"
            })
        })
}

/*

//---------------------------------Fetch Product By CategoryId--------------------------------------------------

    const fetchProductByCategoryId = (req, res) => {
        productRepository.fetchProductByAllCriteria({
                where: {
                    categoryId: req.params.categoryId
                }
            })
            .then(result => {
                if (!result) {
                    return res.status(404).send({
                        message: "Result Not Found!"
                    })
                }
                console.log('Product Fetched By CategoryId SuccessFully!');
                return res.status(200).send(result)
            })
            .catch(error => {
                console.log('Error Occured In Fetching Product By Name', error);
                return res.status(500).send({
                    message: "Error Occured in Fetching Product By Name"
                })
            })
    }
    */



//---------------------------------------Fetch ALL Products ---------------------------------------

const fetchAllProducts = (req, res) => {
    productRepository.findAllProducts()
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Result Not Found!"
                })
            }
            console.log('Product Fetched SuccessFully!');
            return res.status(200).send(result)
        })
        .catch(error => {
            console.log('Error Occured In Fetching Product By CategoryId', error);
            return res.status(500).send({
                message: "Error Occured in Fetching Product By CategoryId"
            })
        })
}

module.exports = {
    addProduct: addProduct,
    fetchProductByName: fetchProductByName,
    fetchProductByCategoryId: fetchProductByCategoryId,
    fetchAllProducts: fetchAllProducts,
    search: search
}