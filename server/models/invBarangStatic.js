const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const InvBarangStatic = sequelize.define('InvBarangStatic', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jenis: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'invBarangStatic',
  modelName: 'InvBarangStatic'
});

module.exports = InvBarangStatic;