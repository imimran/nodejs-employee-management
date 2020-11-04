const { Sequelize, Model } = require("sequelize");
const sequelize = require("../utils/db");
const Organization = require('./organization')


const Attendence = sequelize.define("attendence", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  leaves: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  organizationId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Organization,
      key: "id",
    },
  },
});

module.exports = Attendence;
