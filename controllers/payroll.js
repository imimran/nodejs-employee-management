const Payroll = require("../models/payroll");
const Employee = require("../models/employee");
const Organization = require("../models/organization");
const { success, fail, validation } = require("../utils/helper");
const { authUser } = require("../utils/auth");

exports.getAllPayroll = async (req, res) => {
  try {

        // const token = req.header("auth-token");
        // auth_user = await authUser(token);

        // let paysolls;

        // if (auth_user.isAdmin == 1) {
        //   paysolls = await Payroll.findAll();
        // } else {
        //   paysolls = await Payroll.findAll({
        //     where: { userId: auth_user.id },
        //   });
        // }
    const payroll = await Payroll.findAll({ where: { organizationId: "29", employeeId:"5" }});
    res.status(200).json(success("OK", { data: payrolls }, res.statusCode));

  } catch (error) {
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

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
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.addPayroll = async (req, res) => {
  try {
    const salary = req.body.salary;
    const employeeId = req.body.employeeId;
    const organizationId = req.body.organizationId;

    if (!salary) {
      return res
        .status(422)
        .json(validation("Please input all field"));
    }

    // let employee = await Employee.findByPk(employeeId);
    // if (!employee)
    //   return res
    //     .status(400)
    //     .json(validation("No registered Employee Found.", res.statusCode));

    // let organization = await Organization.findByPk(organizationId);
    // if (!organization)
    //   return res
    //     .status(400)
    //     .json(validation("No registered Organization Found.", res.statusCode));

    const payroll = await Payroll.create({
      salary: salary,
      employeeId: employeeId,
      organizationId: organizationId,
    });
    res
      .status(200)
      .json(success("Add Successfully", { data: payroll }, res.statusCode));
  } catch (error) {

    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};
