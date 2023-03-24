const e = require('express');
const cartRepository = require('../DataAccessObject(DAO)/Repository(CRUD Ops)/cart.repository');
const productRepository = require('../DataAccessObject(DAO)/Repository(CRUD Ops)/product.repository');
const { Product } = require('../DataAccessObject(DAO)/Repository(CRUD Ops)/product.repository');

exports.createCart = (req, res)=>{
   const cart = {
    userName : req.user.userName,
    cost : req.body.cost
   }
    cartRepository.addCart(cart)
    .then(result =>{
        console.log('Cart Created SuccessFully', result);
        res.status(201).send(result);
    })
    .catch(error =>{
        console.log(`Error Occured in Cart Creation`, error);
        res.status(500).send({
            message:'Error In Cart Creation, Please Try Again After SomeTime!'
        })
    })
}

exports.update = (req, res)=>{
const cartId = req.params.id;

cartRepository.getCart(cartId)
.then(cart => {
    console.log(cart);
    productRepository.fetchProductByAllCriteria({
        where:{
            id : req.body.productIds
        }
    })
.then(items => {
    if(!items){
        res.status(400).send({
            message:'Items Not Found'
        })
    }
    cart.setProducts(items).
    then(()=>{
        console.log("Product SuccessFully Added into Cart");
        var cost = 0;
        let productSelected = [];
    cart.getProducts()
    .then(product =>{
        for(let i = 0; i < product.length; i++){
            cost += product[i].price;
            productSelected.push({
                id : product[i].id,
                name : product[i].name,
                cost: product[i].price
            });
        }
        res.status(200).send({
            id: cart.id,
         productSelected: productSelected,
         cost :cost
        })
    })
    })    
    })
})
.catch(error =>{
    console.log(`Error Occured in Updating Cart by cartId`, error);
    res.status(500).send({
      message:'Error Occurred in Updating Cart By ID'
    })
})
}

exports.getCart = (req, res)=>{
    const cartId = req.params.id;

    cartRepository.getCart(cartId)
    .then(cart =>{
        console.log(cart);

        var cost = 0;
        let productSelected = [];
        cart.getProducts()
        .then(product =>{
            for(let i = 0; i < product.length; i++){
                cost = cost + product[i].price;
                productSelected.push({
                    id: product[i].id,
                    name: product[i].name,
                    cost : product[i].price
                })
            }
            res.status(200).send({
                id: cart.id,
                productSelected: productSelected,
                cost: cost
            })
        })
       
    })
    .catch(error =>{
        console.log(`Error Occured in fetching Cart by cartId`, error);
        res.status(500).send({
          message:'Error Occurred in Fetching Cart By ID'
        })
    })
}