const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const InvBarang = require('./invBarang');

const InvGudangAktif = sequelize.define('InvGudangAktif', {
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'invGudangAktif',
  modelName: 'InvGudangAktif'
});

InvBarang.hasMany(InvGudangAktif);
InvGudangAktif.belongsTo(InvBarang);

module.exports = InvGudangAktif;