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
    type: Sequelize.JSON(Sequelize.DATEONLY),
    allowNull: false,
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  organizationId: {
    type: Sequelize.INTEGER,
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