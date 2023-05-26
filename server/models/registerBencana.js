const { DataTypes } = require('sequelize')
const sequelize = require('../configs/database')

const RegBencana = sequelize.define('RegBencana', {
  jenisBencana: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lokasiDetail: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  kecamatan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  korbanManusia: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  korbanHewan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  korbanHartaBenda: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  totalKerugian: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: "registerBencana",
  modelName: "RegBencana"
});

module.exports = RegBencana;