const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const InvBarangStatic = require('./invBarangStatic');

const InvGudangAktifStatic = sequelize.define('InvGudangAktifStatic', {
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
  tableName: 'invGudangAktifStatic',
  modelName: 'InvGudangAktifStatic'
});

InvBarangStatic.hasMany(InvGudangAktifStatic);
InvGudangAktifStatic.belongsTo(InvBarangStatic);

module.exports = InvGudangAktifStatic;