const InvBarang = require('../models/invBarang');
const InvGudangAktif = require('../models/invGudangAktif');
const invTransaksiGudang = require('../models/invTransaksiGudang');

const utils = require('./invUtils');

exports.setInTransaction = async () => {
  let thisMonth = (new Date()).getMonth() + 1;
  let pastMonth = (new Date()).getMonth();
  if (pastMonth == 0) pastMonth = 12;

  let result = await utils.getInTransaction(thisMonth, 'masuk');
  for (let i = 0; i < result.length; i ++) {
    volPastMonth = await utils.getVolumePastMonth(pastMonth, result[i].id);
    volThisMonth = await utils.sumVolumeTransaction(thisMonth, 'masuk', result[i].id);
    result[i].dataValues.stokBulanLalu = volPastMonth;
    if (volThisMonth) {
      result[i].dataValues.totalJumlah = parseInt(volThisMonth) + parseInt(volPastMonth);
    }
    else {
      result[i].dataValues.totalJumlah = parseInt(volPastMonth);
    }
  }
  return result;
};

exports.setAddInTransaction = async (data, idBarang) => {
  await utils.addInTransaction(data, idBarang);
  return;
};

exports.setEditInTransaction = async (data) => {
  await utils.editInTransaction(data);
  return;
};