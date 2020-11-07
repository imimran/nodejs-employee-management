const Sequelize = require('sequelize')
const sequelize = new Sequelize('employee', 'root', '@capTain100', {
    dialect: 'mysql',
    host: 'localhost'
    
})

module.exports = sequelize
