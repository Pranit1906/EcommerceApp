const { defineUser } = require('../Models/user.model');
const dbConnection = require('./dbConnection');

const User = defineUser(dbConnection.connection, dbConnection.DataTypes);

const userTableCreator = async(forceCreation) => {
    return await User.sync({ force: forceCreation })
}


const createUser = async(user) => {
    const dbUser = await User.create({
        userName: user.userName,
        emailId: user.emailId,
        password: user.password,
        phoneNumber: user.phoneNumber
    });
    return userResponse = {
        userName: dbUser.userName,
        emailId: dbUser.emailId,
        phoneNumber: dbUser.phoneNumber
    }
}

const fetchUserByCriteria = async(criteria) => {
    return await User.findOne(criteria);
}

module.exports = {
    userTableCreator: userTableCreator,
    createUser: createUser,
    fetchUserByCriteria: fetchUserByCriteria
}