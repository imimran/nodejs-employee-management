
const { Sequelize, Model } = require("sequelize");
const sequelize = require("../utils/db.js");
const Organization = require("./organization.js");

const Announcement = sequelize.define("announcement", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  organizationId: {
      type: Sequelize.INTEGER,
      references: {
        model: Organization,
        key: 'id'
      }
    }
});

module.exports = Announcement;