const repo = require('./repoBarang');
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
  await repo.addTransaction(data);
  await utils.updateVolumeInvenActive();
  return;
};

exports.setEditOutTransaction = async (data) => {
  await repo.editTransaction(data);
  await utils.updateVolumeInvenActive();
  return;
};