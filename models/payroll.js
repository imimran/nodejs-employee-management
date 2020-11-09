const { Sequelize, Model } = require("sequelize");
const sequelize = require("../utils/db");
const Employee = require('./employee')
const Organization = require('./organization')
const User = require("../models/user");

const Payroll = sequelize.define("payroll", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  organizationId: {
    type: Sequelize.INTEGER,
    references: {
      model: Organization,
      key: "id",
    },
  },
});

module.exports = Payroll
