const { Sequelize, Model } = require("sequelize");
const sequelize = require("../utils/db");
const Organization  = require("../models/organization");

const CostManage = sequelize.define("costmanage", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  staffSalary: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  officeRent: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  utilityBill: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // organizationId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Organization,
  //     key: "id",
  //   },
  // },
});

module.exports = CostManage;
