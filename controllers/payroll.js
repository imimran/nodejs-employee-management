const Payroll = require('../models/payroll')
const Employee = require("../models/employee");
const { success, fail } = require("../utils/helper");

exports.getAllPayroll = async(req, res)=>{

      try {
        const payroll = await Payroll.findAll();
        res.status(200).json(success("OK", { data: payroll }, res.statusCode));
      } catch (error) {
        console.log(error);
      }
      res.status(501).json(fail(error, res.statusCode));
      return;
    
}

exports.getPayrollById = async (req, res) => {

      try {
        if (!req.params.id) {
          throw "No Match ID";
        }

       const payroll = await Payroll.findByPk(req.params.id);
        res.status(200).json(success("OK", { data: payroll }, res.statusCode));
        return;
      } catch (error) {
        console.log(error);
      }
      res.status(501).json(fail(error, res.statusCode));
      return; 

};

exports.addPayroll = async( req, res) =>{

    try {
   const salary = req.body.salary;
   const employeeId = req.body.employeeId;

      if (!salary || !employeeId) {
        return res.status(422).json({ error: "Please input all field" });
      }

      let employee = await Employee.findByPk(employeeId);
      if (!employee)
        return res.status(400).json({ msg: "No registered Employee Found." });

      const payroll = await Payroll.create({
        salary: salary,
        employeeId: employeeId,
      });
      res
        .status(200)
        .json(success("Add Successfully", { data: payroll }, res.statusCode));
    } catch (error) {
      console.log(error);
    }
    res.status(501).json(fail(error, res.statusCode));
    return;
}