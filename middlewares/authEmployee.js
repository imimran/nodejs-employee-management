const jwt = require("jsonwebtoken");
const { jwtKey } = require("../utils/key");
const { validation } = require("../utils/helper");
const Employee = require("../models/employee");

async function authEmployee(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .json(validation("Authorization Failed.No token Provided"));

  try {
    const decoded = jwt.verify(token, jwtKey);
    req.employee = await Employee.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(401).json(validation("Authorization Failed. Invald token"));
  }
}

module.exports = authEmployee;
