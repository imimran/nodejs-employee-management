const CostMange = require("../models/costManage");
const Organization = require('../models/organization')
const { success, fail } = require("../utils/helper");

exports.getAllCost = async (req, res) => {
   try {
      const costs = await CostMange.findAll();
     res.status(200).json(success("OK", { data: costs }, res.statusCode));
   } catch (error) {
     console.log(error);
   }
   res.status(501).json(fail(error, res.statusCode));
   return;

};

exports.getCostById = async (req, res) => {

     try {
       if (!req.params.id) {
         throw "No Match ID";
       }

      const cost = await CostMange.findByPk(req.params.id);
       res.status(200).json(success("OK", { data: cost }, res.statusCode));
       return;
     } catch (error) {
       console.log(error);
     }
     res.status(501).json(fail(error, res.statusCode));
     return;
};

exports.addCost = async (req, res) => {

   try {
       const staffSalary = req.body.staffSalary;
       const officeRent = req.body.officeRent;
       const utilityBill = req.body.utilityBill;
       const organizationId = req.body.organizationId;

     if (!staffSalary || !officeRent || !utilityBill || !organizationId) {
       return res
         .status(422)
         .son(validation("Please input all field", res.statusCode));
     }

      let organization = await Organization.findByPk(organizationId);
      if (!organization)
        return res
          .status(400)
          .json(
            validation("No registered Organization Found.", res.statusCode)
          );

   const cost = await CostMange.create({
     staffSalary: staffSalary,
     officeRent: officeRent,
     utilityBill: utilityBill,
     organizationId: organizationId,
   });
     res
       .status(200)
       .json(success("Add Successfully", { data: cost }, res.statusCode));
   } catch (error) {
     console.log(error);
   }
   res.status(501).json(fail(error, res.statusCode));
   return;
};
