const { DataTypes } = require('sequelize')
const sequelize = require('../configs/database')

const ArsipInaktif = sequelize.define('ArsipInaktif', {
  kodeKlasifikasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jenisArsip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kurunWaktu: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tingkatPerkembangan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jumlah: {
    type: DataTypes.STRING,
    allowNull: false
  },
  keterangan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomorDefFolderDanBoks: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lokasiSimpan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jangkaSimpanDanNasibAkhir: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kategoriArsip: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'arsipInaktif',
  modelName: 'ArsipInaktif'
});

module.exports = ArsipInaktif;