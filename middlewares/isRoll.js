const User = require("../models/user");
const {validation} = require('../utils/helper')

exports.isAdmin = async(req, res, next) => {
   if (!req.user.isAdmin) 
    return res.status(401).json(validation("You are not allowed to access."));
    next();
}

exports.isEmployee = async (req, res, next) => {
  if (!req.user.isEmployee)
    return res.status(401).json(validation("You are not allowed to access."));
  next();
};

exports.isOrganizer = async (req, res, next) => {
  if (!req.user.isOrganizer)
    return res.status(401).json(validation("You are not allowed to access."));
  next();
};


