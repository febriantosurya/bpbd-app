const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Inventory = sequelize.define('Inventory', {
  idAdmin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: true
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true
  },
  year: {
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
  tableName: "inventories",
  modelName: "Inventory"
});

module.exports = Inventory;