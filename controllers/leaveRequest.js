const LeaveRequest = require("../models/leaveRequest");

exports.getAllLeaveRequest = async (req, res) => {
  const leaveRequests = await LeaveRequest.findAll();
  res.send(leaveRequests);
};

exports.getAllLeaveRequestById = async (req, res) => {
  const leaveRequest = await LeaveRequest.findByPk(req.params.id);
  res.send(leaveRequest);
};

exports.addLeaveRequest = async (req, res) => {

  const leaveForDays = req.body.leaveForDays;
  const employeeId = req.body.employeeId;

  const leaveReq = await LeaveRequest.create({
    leaveForDays: leaveForDays,
    employeeId: employeeId,
  });
  res.send(leaveReq);
};
