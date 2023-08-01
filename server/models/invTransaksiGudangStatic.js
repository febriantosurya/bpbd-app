const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const InvBarangStatic = require('./invBarangStatic');

const InvTransaksiGudangStatic = sequelize.define('InvTransaksiGudangStatic', {
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'invTransaksiGudangStatic',
  modelName: 'InvTransaksiGudangStatic'
});

InvBarangStatic.hasMany(InvTransaksiGudangStatic);
InvTransaksiGudangStatic.belongsTo(InvBarangStatic);

module.exports = InvTransaksiGudangStatic;
