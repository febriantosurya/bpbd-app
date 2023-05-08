const repo = require('./repoBarang');

// UPDATE INVEN ACTIVE ANY TRANSACTION CHANGED
exports.updateVolumeInvenActive = async () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  let transactionIn = await repo.getTransaction(month + 1, year, 'masuk');
  let transactionOut = await repo.getTransaction(month + 1, year, 'keluar');
  let data = {}
  for (let i = 0; i < transactionIn.length; i++) {
    volOut = await repo.sumVolumeTransaction(month + 1, year, 'keluar', transactionOut[i].id);
    volPastMonth = await repo.getVolumePastMonth(month, year, transactionIn[i].id);
    volThisMonth = await repo.sumVolumeTransaction(month + 1, year, 'masuk', transactionIn[i].id);
    if (!volOut) volOut = 0;
    if (!volPastMonth) volPastMonth = 0;
    if (!volThisMonth) volThisMonth = 0;
    data = {
      idBarang: transactionIn[i].id,
      jumlah: parseInt(volThisMonth) + parseInt(volPastMonth) - parseInt(volOut)
    };
    await repo.updateInvenActive(data);
  };
  return;
};