const { Sequelize, Model} = require('sequelize')
const sequelize = require('../utils/db.js');
const Employee = require('./employee.js');
const Organization = require("./organization");

const LeaveRequest = sequelize.define("leaverequest", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  leaveForDays: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  organizationId: {
    type: Sequelize.STRING,
    references: {
      model: Organization,
      key: "id",
    },
  },
  employeeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Employee,
      key: "id",
    },
  },
});

module.exports = LeaveRequest