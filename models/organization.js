const { Sequelize, Model } = require("sequelize");
const sequelize = require("../util/db");

const User = require('../models/user')

const Organization = sequelize.define("organization", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references:{
        model: User,
        key: 'id'
    }
  },
});
module.exports = Organization