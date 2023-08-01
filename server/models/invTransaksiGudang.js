const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const InvBarang = require('./invBarang');

const InvTransaksiGudang = sequelize.define('InvTransaksiGudang', {
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
  tableName: 'invTransaksiGudang',
  modelName: 'InvTransaksiGudang'
});

InvBarang.hasMany(InvTransaksiGudang);
InvTransaksiGudang.belongsTo(InvBarang);

module.exports = InvTransaksiGudang;
