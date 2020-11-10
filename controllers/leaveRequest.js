const Employee = require("../models/employee");
const Organization = require("../models/organization");
const LeaveRequest = require("../models/leaveRequest");
const { success, fail, validation } = require("../utils/helper");
const { authUser } = require("../utils/auth");

exports.getAllLeaveRequest = async (req, res) => {
  try {
    const token = req.header("auth-token");
    auth_user = await authUser(token);
    const leaveRequests = await LeaveRequest.findAll({
      where: {
        "$organization.userId$": auth_user.id,
      },
      include: [
        {
          model: Organization,
        },
      ],
    });
    res
      .status(200)
      .json(success("OK", { data: leaveRequests }, res.statusCode));
      
  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.getAllLeaveRequestById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "No Match ID";
    }

    const leaveRequest = await LeaveRequest.findByPk(req.params.id);
    res.status(200).json(success("OK", { data: leaveRequest }, res.statusCode));
    return;

  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};

exports.addLeaveRequest = async (req, res) => {
  try {
    const leaveForDays = req.body.leaveForDays;
    const employeeId = req.body.employeeId;

    if (!leaveForDays) {
      return res.status(422).json(validation("Please input all field"));
    }

    // let employee = await Employee.findByPk(employeeId);
    // if (!employee)
    //   return res
    //     .status(400)
    //     .json(validation("No registered Employee Found."));

    const leaveReq = await LeaveRequest.create({
      leaveForDays: leaveForDays,
      employeeId: employeeId,
    });
    res
      .status(200)
      .json(success("Add Successfully", { data: leaveReq }, res.statusCode));

  } catch (error) {
    console.log(error);
    res.status(501).json(fail(error, res.statusCode));
    return;
  }
};
