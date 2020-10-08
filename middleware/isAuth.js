const jwt = require("jsonwebtoken");
const {jwtKey} = require("../util/key");


 function auth( req, res, next){
     const token = req.header("auth-token")
     if(!token)
     return res.status(401).send("No token Provided")

     try {
         const decoded = jwt.verify(token, jwtKey)
         req.user = decoded
         next()         
     } catch (error) {
         res.status(400).send("Invald token")
     }
 }

 module.exports = auth
