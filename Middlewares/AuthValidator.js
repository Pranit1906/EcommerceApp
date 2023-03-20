//saltGen(saltRounds) ===> saltRounds Will make process Slow by that value..to protect from hacker to decode fast.
// const { response } = require("express");
// const req = require("express/lib/request");
const { ValidateToken } = require("../Externals/authService");

exports.validateUser = (req, res, next)=>{
  const authToken = req.headers['authorization'];
  ValidateToken(authToken)
  .then(res =>{
    if(res.status === 200){
        console.log("User Authorized, Can Proceed Futher", res);
        req.user = res.data;
        console.log(res.data)
        next();
    }
    else if(res.status === 401){
        return res.status(401);
    }
    else if(res.status === 403){
        return res.status(403);
    }
    else{
        return res.status(500).send({
            message:'Error Occured in User Validation! Please Try Again Later'
        })
    }
  })
  .catch(error =>{
    console.log(`Error Occured in User Token Validation`, error);
    res.status(500).send({
        message:'Error Occured in User Validation!'
  })
  });
}

exports.isAdmin = (req, res, next)=>{
    if(!(req.user && req.user.permission === 'ADMIN')){
        console.log(req.user.permission);
        return res.status(401).send({
            message:"User is Not Authorized, Admin Required!"
        })
    }
    next();
}