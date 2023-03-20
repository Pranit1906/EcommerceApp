// Authorization lecture link :- https://www.youtube.com/watch?v=NIuV8O2poVM&t=9710s
const userRepository = require('../DataAccessObject(DAO)/Repository(CRUD Ops)/user.repository');
const bcrypt = require("bcrypt")
const { Op } = require('sequelize');
const authService = require('../Externals/authService')

const encryptedPassword = async(password) => {
    const salt = await bcrypt.genSalt(); // salt will slow down generation of hash with default value 10 is time taken
    return await bcrypt.hash(password, salt);
}

const registerUser = (req, res) => {
    encryptedPassword(req.body.password)
        .then(hashedPassword => {
            console.log(hashedPassword);
            req.body.password = hashedPassword;
            return userRepository.createUser({
                userName: req.body.userName,
                emailId: req.body.emailId,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                permission: req.body.permission
            })
        })
        .then(result => {
            console.log('User Registered Successfully');
            res.status(201).send(result)
        })
        .catch(error => {
            console.log('Error Occured In User Registration', error);
            res.status(500).send({
                message: "Error Occured In User Registration"
            })
        })
}

const authenicatingPassword = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

const login = (req, res) => {
    userRepository.fetchUserByCriteria({
            where: {
                [Op.or]: [{
                    userName: req.body.userName
                }, {
                    emailId: req.body.emailId
                }]
            }
        })
        .then(async(user) => {
            const validUser = await authenicatingPassword(req.body.password, user.password);
            return validUser ? user : undefined
        })

        .then(user => {
       
            if (!user) {
                return res.status(401).send({
                    message: 'Invalid UserName or Password!'
                })
            }

            return authService.AccessToken({
                userName : user.userName,
                permission : user.permission
            })
        })
            .then(result => {
               // console.log(`Result : `,result);
            res.status(200).send(result.data)
        })
        .catch(error => {
            console.log('Error Occurred In Login!', error);
            res.status(500).send({
                message: 'Error Occurred In Login, Please try After SomeTime'
            })
        })
}

module.exports = {
    registerUser: registerUser,
    login: login
}

/*
const userAdd = (req, res)=>{
    userRepository.createUser
}
*/