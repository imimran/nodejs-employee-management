const { Sequelize, Model } = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  isEmployee: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  isOrganizer: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
});
module.exports = User
