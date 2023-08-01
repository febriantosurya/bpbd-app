const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Kecamatan = sequelize.define('Kecamatan', {
  nama:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'kecamatan',
  modelName: 'Kecamatan'
})

module.exports = Kecamatan;