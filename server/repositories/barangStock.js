const repo = require('./repoBarang');

exports.setShowInventoryThisMonth = async () => {
  const result = await repo.getInventoryThisMonth();
  return result;
};

exports.setUpdateInvenPerMonth = async (data) => {
  const result = await repo.getAllInvenActive(data);
  if (result.length < 1) {
    const tanggal = new Date();
    const newData = {
      month: tanggal.getMonth(),
      year: tanggal.getFullYear()
    }
    const invenDatas = await repo.getAllInvenActive(newData);
    for (let i = 0; i < invenDatas.length; i++) {
      data = {
        tanggal: invenDatas[i].tanggal,
        jumlah: invenDatas[i].jumlah,
        keterangan: invenDatas[i].keterangan,
        idBarang: invenDatas[i].InvBarangId
      }
      await repo.addInvenDump(data);
    }
    await repo.updateAllDateInvenActive(tanggal, newData.month);
  };
  return;
};

exports.setUpdateNoteToInventory = async (data) => {
  await repo.addNoteToInventory(data);
  return;
};