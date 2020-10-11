const Attendence = require('../models/attendence')
const Employee = require("../models/employee");
const Organization = require('../models/organization')
const { success, fail } = require("../utils/helper");

exports.getAllAttendence = async(req, res) =>{
       try {
         const attendence = await Attendence.findAll();
         res
           .status(200)
           .json(success("OK", { data: attendence }, res.statusCode));
       } catch (error) {
         console.log(error);
       }
       res.status(501).json(fail(error, res.statusCode));
       return;
}

exports.getAllAttendenceById = async(req, res) =>{

     try {
       if (!req.params.id) {
         throw "No Match ID";
       }

      const attendence = await Attendence.findByPk(req.params.id);
       res
         .status(200)
         .json(success("OK", { data: attendence }, res.statusCode));
       return;
     } catch (error) {
       console.log(error);
     }
     res.status(501).json(fail(error, res.statusCode));
     return;

}

exports.addAttendence = async(req, res) =>{

       try {
         const month = req.body.month;
         const leaves = req.body.leaves;
         const employeeId = req.body.employeeId;
         const organizationId = req.body.organizationId

         if (!month || !leaves || !employeeId || !organizationId) {
           return res
             .status(422)
             .json(validation("Please input all field", res.statusCode));
         }

         let employee = await Employee.findByPk(employeeId);
         if (!employee)
           return res
             .status(400)
             .json(validation("No registered Employee Found.", res.statusCode));

         let organization = await Organization.findByPk(organizationId);
         if (!organization)
           return res
             .status(400)
             .json(
               validation("No registered Organization Found.", res.statusCode)
             );
  

        const attendence = await Attendence.create({
          month: month,
          leaves: leaves,
          employeeId: employeeId,
          organizationId: organizationId
        });
         res
           .status(200)
           .json(
             success("Add Successfully", { data: attendence }, res.statusCode)
           );
       } catch (error) {
         console.log(error);
       }
       res.status(501).json(fail(error, res.statusCode));
       return;
}