const { DataTypes } = require('sequelize')
const sequelize = require('../configs/database')

const ArsipAktif = sequelize.define('ArsipAktif', {
  noBerkas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  noItemArsip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kodeKlasifikasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uraianInfoArsip: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  jumlah: {
    type: DataTypes.STRING,
    allowNull: false
  },
  keterangan: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'arsipAktif',
  modelName: 'ArsipAktif'
});

module.exports = ArsipAktif;