const jwt = require("jsonwebtoken");
const {jwtKey} = require("../utils/key");
const {validation} = require('../utils/helper')


 function auth( req, res, next){
     const token = req.header('auth-token');
     if(!token)
     return res.status(501).json(validation("Authorization Failed.No token Provided", res.statusCode))

     try {
         const decoded = jwt.verify(token, jwtKey)
         req.user = decoded
         next()         
     } catch (error) {
         res.status(500).json(validation("Authorization Failed. Invald token", res.statusCode))
     }
 }

 module.exports = auth
