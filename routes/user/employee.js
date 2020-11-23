const express = require("express");
const Employee = require("../../models/employee");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../../utils/key");
const bcrypt = require("bcrypt");
const { validation, success } = require("../../utils/helper");



router.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(501).json(validation("please add email or password"));
  }

  let employee = await Employee.findOne({ where: { email: req.body.email } });
  if (!employee) return res.status(501).json(validation("employee Not registered."));


//    const validPassword = await Employee.findOne({
//      password: req.body.password,
//    });
//    if (!validPassword)
//       return res.status(501).json(validation("Invalid email or password "));

//   const validPassword = await bcrypt.compare(req.body.password, employee.password);
//   if (!validPassword)
//     return res.status(501).json(validation("Invalid email or password "));

 if (req.body.password !== employee.password)
   return res.status(400).send("Invalid email or password ");

  const token = jwt.sign(
    {
      id: employee.id,
      email: employee.email,
      
     
    },
    jwtKey
  );
  res.status(200).json(
    success(
      "Your Token! ",
      {
        data: token,
        id: employee.id,
        email: employee.email,
       
      },
      res.statusCode
    )
  );
});

module.exports = router;
