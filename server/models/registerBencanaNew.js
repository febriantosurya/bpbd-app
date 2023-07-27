const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const RegBencanaNew = sequelize.define('RegBencanaNew', {
  jenisBencana: {
    type: DataTypes.STRING,
    allowNull: false
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lokasiDetail: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  kecamatan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  waktu: {
    type: DataTypes.STRING,
    allowNull: false
  },
  korbanManusia: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  korbanHewan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  korbanRumah: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  korbanHarta: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  korbanJalan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  totalKerugian: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  penyebabKejadian: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: "registerBencanaNew",
  modelName: "RegBencanaNew"
});

module.exports = RegBencanaNew;