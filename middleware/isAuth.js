const jwt = require("jsonwebtoken");
const {jwtKey} = require("../utils/key");


 function auth( req, res, next){
     const token = req.header("auth-token")
     if(!token)
     return res.status(401).send("Authorization Failed.No token Provided")

     try {
         const decoded = jwt.verify(token, jwtKey)
         req.user = decoded
         next()         
     } catch (error) {
         res.status(400).send("Authorization Failed. Invald token")
     }
 }

 module.exports = auth
