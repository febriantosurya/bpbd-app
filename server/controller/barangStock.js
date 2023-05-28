const barangStockRepo = require('../repositories/barangStock');
const repoBarang = require('../repositories/repoBarang');

exports.showInventoryThisMonth = async (req, res) => {
  try {
    const result = await barangStockRepo.setShowInventoryThisMonth();
    return res.status(200).json({ message: 'success', data: result });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.showInventoryPastByMonth =  async (req, res) => {
  try {
    const data = {
      month: req.params.month,
      year: req.params.year
    };
    const result = await repoBarang.getInventoryByMonth(data);
    return res.status(200).json({ message: 'success', data: result });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.updateInvenPerMonth = async (req, res) => {
  try {
    const tanggal = new Date();
    const data = {
      month: tanggal.getMonth() + 1,
      year: tanggal.getFullYear()
    };
    await barangStockRepo.setUpdateInvenPerMonth(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.updateNoteInventory = async (req, res) => {
  try {
    const data = {
      id: req.body.idGudangAktif,
      note: req.body.note
    };
    await barangStockRepo.setUpdateNoteToInventory(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};