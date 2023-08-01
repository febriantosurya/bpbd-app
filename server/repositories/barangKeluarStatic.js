const repo = require('./repoBarangStatic');
const utils = require('./utils');

exports.setOutTransaction = async (month, year, status) => {
  let result = await repo.getTransaction(month, year, status);
  for (let i = 0; i < result.length; i++) {
    volThisMonth = await repo.sumVolumeTransaction(month, year, status, result[i].id);
    volThisMonth ? result[i].dataValues.totalJumlah = volThisMonth : result[i].dataValues.totalJumlah = null;
  }
  return result;
};

exports.setAddOutTransaction = async (data) => {
  const check = await repo.checkNamaBarang(data);
  if (check === false) {
    return false;
  };
  await repo.addTransaction(data);
  await utils.updateVolumeInvenActiveStatic();
  return;
};

exports.setEditOutTransaction = async (data) => {
  await repo.editTransaction(data);
  await utils.updateVolumeInvenActiveStatic();
  return;
};