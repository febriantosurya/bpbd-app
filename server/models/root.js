const { DataTypes } = require('sequelize')
const sequelize = require('../configs/database')

const Root = sequelize.define('Root', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
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
  }
}, {
  sequelize,
  timestamps: false,
  tableName: "root",
  modelName: "Root"
})

module.exports = Root