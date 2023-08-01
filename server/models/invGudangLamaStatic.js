const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const InvBarangStatic = require('./invBarangStatic');

const InvGudangLamaStatic = sequelize.define('InvGudangLamaStatic', {
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  kondisi: {
    type: DataTypes.STRING,
    allowNull: true
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'invGudangLamaStatic',
  modelName: 'InvGudangLamaStatic'
});

InvBarangStatic.hasMany(InvGudangLamaStatic);
InvGudangLamaStatic.belongsTo(InvBarangStatic);

module.exports = InvGudangLamaStatic;