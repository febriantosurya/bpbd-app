const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Kecamatan = require('./dataKecamatan')

const Desa = sequelize.define('Desa', {
  nama:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'desa',
  modelName: 'Desa'
})

Kecamatan.hasMany(Desa);
Desa.belongsTo(Kecamatan);

module.exports = Desa;