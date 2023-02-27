const { DataTypes } = require('sequelize')
const sequelize = require('../configs/database')

const User = sequelize.define('User', {
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
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  tableName: "users",
  modelName: "User"
});

module.exports = User;