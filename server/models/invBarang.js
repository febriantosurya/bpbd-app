const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const InvBarang = sequelize.define('InvBarang', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'invBarang',
  modelName: 'InvBarang'
});

module.exports = InvBarang;