const categoryRepository = require("../DataAccessObject(DAO)/Repository(CRUD Ops)/category.repository");
const errorConstants = require('../Constants/errorConstants')
const category = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: 'Name is Required'
        })
    }


    //------------------------------------------------Category Creation -----------------------------------------------    

    categoryRepository.createCategory({
        name: req.body.name,
        description: req.body.description,
    }).then(result => {
        console.log(`Category by name ${result.name} was created successfully!`);
        res.status(201).send(result);
    }).catch(error => {
        if (error.name === errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR) {
            console.log(error.errors[0]);
            return res.status(400).send({
                message: `${req.body.name} Already exists!`
            })
        }
        throw error;
    }).catch(error => {
        console.log('Error Occured in Creation of Category', error);
        res.status(500).send({
            message: 'Error Occured in Category Creation'
        })
    })

}



//------------------------------------------------Fetching All Category ----------------------------------------------- 


const fetchAllCategory = (req, res) => {
    categoryRepository.fetchAll()
        .then(categories => {
            console.log('All Categories Fetched Successfully!');
            return res.status(200).send({
                categories
            })
        }).catch(error => {
            console.log('Error Occured in fetching Categories', error);
            return res.status(500).send({
                message: 'Error Occured Fetching All Categories Please Try Again After Sometime!'
            })
        })
}

//------------------------------------------------Fetching  Category By Id ----------------------------------------------- 


const categoryFetchById = (req, res) => {
    const categoryId = req.params.categoryId;
    categoryRepository.fetchById(categoryId)
        .then(result => {
            if (!result) {
                //------------------------------With Error Object WE THrow Error Message--------------------------------------------
                /*
                    throw new Error(errorConstants.MISSING_CATEGORY)
                    console.log(`With Id : ${categoryId} Category successfully fetched `);
                    res.status(200).send(result);
                    })
                    .catch(error =>{
                        if(error.message === MISSING_CATEGORY){   return res.status(404).send({
                            message: `Category with Id: ${categoryId} doesn't exist!`
                        })}
                    })
                */

                //-------------------------------Without Error Object We SHow Error Message------------------------------------------                
                return res.status(404).send({
                    message: `Category with Id: ${categoryId} doesn't exist!`
                })
            }
            console.log(`With Id : ${categoryId} Category successfully fetched `);
            res.status(200).send(result);
        })
        .catch(error => {
            console.log('Error in Fetching Category By Id', error);
            res.status(500).send({
                message: 'Error Occured in Fetching Category By Id Please Try Again After Sometime!'
            })
        })
}


//-------------------------------------------Fetching Category By Name----------------------------------------------
//HW

const fetchByName = (req, res) => {
    //const categoryName = req.params.name;
    categoryRepository.fetchByCriteria({
            where: {
                name: req.params.name
            }
        })
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: `Category with Id: ${req.params.name} doesn't exist!`
                })
            }
            console.log('Category Fetched By Name Successfully!');
            return res.status(200).send(result)
        })
        .catch(error => {
            console.log('Error Occured In Fetching Category By Name', error);
            return res.status(500).send({
                message: "Error Occured in Fetching Category By Name"
            })
        })
}

module.exports = {
    categoryCreation: category,
    fetchAllCategory: fetchAllCategory,
    fetchById: categoryFetchById,
    fetchByName: fetchByName
}