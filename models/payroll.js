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
  pay: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  due: {
    type: Sequelize.INTEGER,
  },
  month: {
    type: Sequelize.JSON,
    allowNull: false,
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
