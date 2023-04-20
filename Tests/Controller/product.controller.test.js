//We use mock Functions to test our code Debug and make it 100% bug free
//Mocking a Function means we don't call actual function instead we mock that function in our own way
// to test that particular function and inspect the mock's state to ensure that callback is invoked as expected.

const productRepository = require('../../DataAccessObject(DAO)/Repository(CRUD Ops)/product.repository');
const {mockRequest, mockResponse} = require('../interceptor');
const productController = require('../../Controller/product.controller');


const product = {
    "name": 'Sony TV Xperia Pro',
    "description":'Brand New Sony 1080p TV',
    "price": 29999,
    "categoryId" : 1
}

let req, res;
beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
})

describe("Testing All Behaviours of Product Modules", ()=>{
    beforeEach(()=>{
        req.body = product
    });
    it("Successfull Product Creation", async ()=>{
        const spy = jest.spyOn(productRepository,'productCreation')
        .mockImplementation(
            //We Pass product object as our repository also take 
            //object as input const productCreation = async(product) => {
            (product)=> Promise.resolve(product)
        )

        await productController.addProduct(req, res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(productRepository.productCreation).toHaveBeenCalledWith(product);
        expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            "name": 'Sony TV Xperia Pro',
            "description":'Brand New Sony 1080p TV',
            "price": 29999,
            "categoryId" : 1
        })
        )
    })
    it("Throwing Error With no Product Name", async()=>{
        req.body = {};

        const spy = jest.spyOn(productRepository,'productCreation')
        .mockImplementation(
            (product)=>(Promise.reject(null))
        )
        await productController.addProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(spy).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:'Name or CategoryId Cannot be Null'
            })
        )
    })
    it("Throwing Error With no CategoryId", async()=>{
        req.body = product;
        delete req.body.categoryId;

        await productController.addProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:'Name or CategoryId Cannot be Null'
            })
        )
    })
})