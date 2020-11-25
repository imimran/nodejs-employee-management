const Attendence = require("../models/attendence");
const Employee = require("../models/employee");
const Organization = require("../models/organization");
const { success, fail, validation } = require("../utils/helper");
const { authUser, authEmployee } = require("../utils/auth");

exports.getAllAttendence = async (req, res) => {
  try {
    const token = req.header("auth-token");
    //auth_user = await authUser(token);

      auth_employee = await authEmployee(token);
    const attendence = await Attendence.findAll({
      where: {
        // "$organization.userId$": auth_user.id,
   
          $employeeId$: auth_employee.id,
        
      },
      include: [
        {
          model: Organization,
        },
        {
          model: Employee,
        },
      ],
    });
    res.status(200).json(success("OK", { data: attendence }, res.statusCode));
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.getAllAttendenceById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "No Match ID";
    }

    const attendence = await Attendence.findByPk(req.params.id);
    res.status(200).json(success("OK", { data: attendence }, res.statusCode));
    return;
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.addAttendence = async (req, res) => {
  try {
    const day = req.body.day;
    const status = req.body.status;
    const employeeId = req.body.employeeId;
    const organizationId = req.body.organizationId;

    if (!day || !status || !employeeId || !organizationId) {
      return res.status(422).json(validation("Please input all field"));
    }

    let employee = await Employee.findByPk(employeeId);
    if (!employee)
      return res.status(400).json(validation("No registered Employee Found."));

    let organization = await Organization.findByPk(organizationId);
    if (!organization)
      return res
        .status(400)
        .json(validation("No registered Organization Found."));

    const attendence = await Attendence.create({
      day: day,
      status: status,
      employeeId: employeeId,
      organizationId: organizationId,
    });
    res
      .status(200)
      .json(success("Add Successfully", { data: attendence }, res.statusCode));
  } catch (error) {
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};
