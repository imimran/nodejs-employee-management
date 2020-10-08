const CostMange = require("../models/costManage");

exports.getAllCost = async (req, res) => {
  const costs = await CostMange.findAll();
  res.send(costs);
};

exports.getCostById = async (req, res) => {
  const cost = await CostMange.findByPk(req.params.id);
  res.send(cost);
};

exports.addCost = async (req, res) => {
  const staffSalary = req.body.staffSalary;
  const officeRent = req.body.officeRent;
  const utilityBill = req.body.utilityBill;
  const organizationId = req.body.organizationId;

  const cost = await CostMange.create({
    staffSalary: staffSalary,
    officeRent: officeRent,
    utilityBill: utilityBill,
    organizationId: organizationId,
  });
  res.send(cost);
};
