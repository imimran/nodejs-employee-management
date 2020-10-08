const { Sequelize, Model} = require('sequelize')
const sequelize = require('../util/db.js');
const Employee = require('./employee.js');

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
    employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: Employee,
          key: 'id'
        }
      }
});

module.exports = LeaveRequest