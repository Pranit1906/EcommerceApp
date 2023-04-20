/*
Mocking in Jest 
Mock functions allow you to test the links between code by erasing the actual implementation of a function,
capturing calls to the function (and the parameters passed in those calls), capturing instances of 
constructor functions when instantiated with new, and allowing test-time configuration of return values.

https://jestjs.io/docs/mock-functions
*/
exports.mockRequest = () => {
    const req = {};
//Whenever req.body will be called jest.fn() will send mockReturnValue having 
//req = {passed while writing test case}  instead of actual req.body
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.query = jest.fn().mockReturnValue(req);

    return req;
}

exports.mockResponse = ()=>{
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
}
    