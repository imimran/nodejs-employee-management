const jwt = require("jsonwebtoken");
const {jwtKey} = require("../utils/key");
const {validation} = require('../utils/helper')
const User = require('../models/user')

 async function auth( req, res, next){
     const token = req.header('auth-token');
     if(!token)
     return res.status(401).json(validation("Authorization Failed.No token Provided"))

     try {
         const decoded = jwt.verify(token, jwtKey)
         req.user = await User.findByPk(decoded.id)
         next()         
     } catch (error) {
         res.status(401).json(validation("Authorization Failed. Invald token"))
     }
 }

 module.exports = auth
