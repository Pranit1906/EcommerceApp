//We use mock Functions to test our code Debug and make it 100% bug free
//Mocking a Function means we don't call actual function instead we mock that function in our own way
// to test that particular function and inspect the mock's state to ensure that callback is invoked as expected.

const productRepository = require('../../DataAccessObject(DAO)/Repository(CRUD Ops)/product.repository');
const {mockRequest, mockResponse} = require('../interceptor');
const productController = require('../../Controller/product.controller');
const errorConstants = require('../../Constants/errorConstants')

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
            ()=>(Promise.reject(null))
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
        req.body = {
            name : product.name,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId
        };
        delete req.body.categoryId;

        await productController.addProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:'Name or CategoryId Cannot be Null'
            })
        )
    })
    it("Throwing Duplicate Name Error", async()=>{
        req.body = product;
        
        const spy = jest.spyOn(productRepository,'productCreation')
        .mockImplementation(
            (product)=>{
                const error = new Error("Duplicate Name!");
                error.name = errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR;
                return Promise.reject(error);
            }
        )

        await productController.addProduct(req, res);

        await expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:`Product Name :-${product.name} Already Exists!`
            })
        )
    })
    it("Successfull Search By Product Name", async()=>{
        req.params.name = "Sony TV Xperia Pro";

        const spy = jest.spyOn(productRepository,'fetchProductByAllCriteria').mockImplementation(
            ({})=>Promise.resolve(product))

        await productController.fetchProductByName(req, res);

        expect(spy).toHaveBeenCalledWith({
            where:{
                name : req.params.name
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining(product)
        )

    })
    it("Failure Case in Search By Product Name Throwing 500 Error", async()=>{
      req.params.name = "Sony TV Xperia Pro";

      const spy = jest.spyOn(productRepository,'fetchProductByAllCriteria')
      .mockImplementation(()=>
        Promise.reject(new Error("Error in fetching Product by Name"))
      )

      await productController.fetchProductByName(req, res);

      await expect(spy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            message:"Error Occured in Fetching Product By Name"
        })
      )

    })
})