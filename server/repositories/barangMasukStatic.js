const repo = require('./repoBarangStatic');
const utils = require('./utils');

exports.setShowInTransaction = async (month, year, status) => {
  let pastMonth = month - 1;
  if (pastMonth == 0) pastMonth = 12;
  let result = await repo.getTransaction(month, year, status);
  for (let i = 0; i < result.length; i ++) {
    volPastMonth = await repo.getVolumePastMonth(pastMonth, year, result[i].id);
    volThisMonth = await repo.sumVolumeTransaction(month, year, status, result[i].id);
    if (volPastMonth && volThisMonth) {
      result[i].dataValues.stokBulanLalu = volPastMonth;
      result[i].dataValues.totalJumlah = parseInt(volThisMonth) + parseInt(volPastMonth);
    }
    else {
      if (volPastMonth && !(volThisMonth)) {
        result[i].dataValues.stokBulanLalu = volPastMonth;
        result[i].dataValues.totalJumlah = volPastMonth;
      }
      if (volThisMonth && !(volPastMonth)) {
        result[i].dataValues.stokBulanLalu = null;
        result[i].dataValues.totalJumlah = volThisMonth;
      }
    };
  };
  return result;
};

exports.setAddInTransaction = async (data) => {
  await repo.addTransaction(data);
  await utils.updateVolumeInvenActiveStatic();
  return;
};

exports.setEditInTransaction = async (data) => {
  await repo.editTransaction(data);
  await utils.updateVolumeInvenActiveStatic();
  return;
};

exports.setAddNewItem = async (data) => {
  const result = await repo.addNewItem(data);
  data.idBarang = result.dataValues.id;
  await repo.addTransaction(data);
  await repo.addInvenActive(data);
  return;
}