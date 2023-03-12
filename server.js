const express = require('express');
const serverConfig = require('./Configs/server.config');
const { initializeTables } = require('./DataAccessObject(DAO)/Repository(CRUD Ops)/tableInitizaler');
const { createRoutes } = require('./Routes/ParentRouter');
//const bodyParser = require('body-parser')
const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
        res.send({
            message: 'Welcome to our Ecommerce Application'
        })
    })
    //Always port must come first then host name in app.listen
app.listen(serverConfig.PORT, () => {
    console.log(`Server is listening on ${serverConfig.HOST} : ${serverConfig.PORT}`)
});
//createRoutes(app);
// initializeTables(true)


//IIFE(Immediate Invoke Function Expression!)

(() => {
    //configure routes
    createRoutes(app);
    // Initializing Tables
    if (serverConfig.NODE_ENV === 'dev') {
        initializeTables(false)
    }

})();