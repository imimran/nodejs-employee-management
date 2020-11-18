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
        {
          model: Employee,
        }
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
    const reason = req.body.reason;
    const status = req.body.status;
    const employeeId = req.body.employeeId;
    const organizationId = req.body.organizationId;

    if (!leaveForDays || !reason || !status || !employeeId || !organizationId) {
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

    const leaveReq = await LeaveRequest.create({
      leaveForDays: leaveForDays,
      reason: reason,
      status: status,
      employeeId: employeeId,
      organizationId: organizationId,
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
