const Employee = require("../models/employee");
const LeaveRequest = require("../models/leaveRequest");
const { success, fail, validation } = require("../utils/helper");

exports.getAllLeaveRequest = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.findAll();
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

    if (!leaveForDays || !employeeId) {
      return res
        .status(422)
        .json(validation("Please input all field", res.statusCode));
    }

    let employee = await Employee.findByPk(employeeId);
    if (!employee)
      return res
        .status(400)
        .json(validation("No registered Employee Found.", res.statusCode));

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
