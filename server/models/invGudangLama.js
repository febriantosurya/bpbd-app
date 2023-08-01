const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const InvBarang = require('./invBarang');

const InvGudangLama = sequelize.define('InvGudangLama', {
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
  tableName: 'invGudangLama',
  modelName: 'InvGudangLama'
});

InvBarang.hasMany(InvGudangLama);
InvGudangLama.belongsTo(InvBarang);

module.exports = InvGudangLama;