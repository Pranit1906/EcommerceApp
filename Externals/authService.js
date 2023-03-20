const axios = require('axios').default;

axios.defaults.baseURL= 'http://localhost:4000';

const getAccessToken = async(payload)=>{
    return await axios.post('/auth/getAccessToken',payload)
};

const validateToken = async(userToken)=>{
const headers ={
    "Content-Type" : "application/json",
    "Authorization" : userToken
}

return await axios.get('/auth/authorize',{
    headers: headers
});
}

module.exports = {
    AccessToken : getAccessToken,
    ValidateToken: validateToken
}



















































































