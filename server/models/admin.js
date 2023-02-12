const { DataTypes } = require('sequelize')
const sequelize = require('../configs/database')

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: true,
    defaultValue: new Date(),
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: true,
    defaultValue: new Date(),
    type: DataTypes.DATE
  }
}, {
  sequelize,
  tableName: "admins",
  modelName: "Admin"
})

module.exports = Admin