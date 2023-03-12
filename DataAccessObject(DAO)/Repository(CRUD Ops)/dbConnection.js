const { Sequelize, DataTypes } = require('sequelize');
const config = require("../../Configs/db.config");

//SIngle DB Connection For Each Repository(like category) to connect 
//to avoid multiple connection for single instance
const connections = new Sequelize(
    config.DB,
    // config.PORT,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

module.exports = {
    connection: connections,
    DataTypes: DataTypes
}