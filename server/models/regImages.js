const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const RegBencanaNew = require('./registerBencanaNew');

const RegImages = sequelize.define('RegImages', {
  path: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'regImages',
  modelName: 'RegImages'
});

RegBencanaNew.hasMany(RegImages);
RegImages.belongsTo(RegBencanaNew);

module.exports = RegImages;