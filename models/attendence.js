const { Sequelize, Model } = require("sequelize");
const sequelize = require("../utils/db");


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
});

module.exports = Attendence;
