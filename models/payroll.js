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

  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  year: {
    type: Sequelize.DOUBLE,
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
