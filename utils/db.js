const Sequelize = require('sequelize')
const sequelize = new Sequelize('employee', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+06:00', // for writing to database
  },
    
)

module.exports = sequelize
