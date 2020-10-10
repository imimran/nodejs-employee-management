const { Sequelize, Model } = require("sequelize");
const sequelize = require("../utils/db");
const Organization = require("./organization");

const Employee = sequelize.define("employee", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  designation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  organizationId:{
    type: Sequelize.INTEGER,
    references: {
      model : Organization,
      key: 'id' 
    } 
  }
});
module.exports = Employee;
