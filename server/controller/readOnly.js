const barangMasukRepo = require('../repositories/barangMasuk');
const barangKeluarRepo = require('../repositories/barangKeluar');
const barangStockRepo = require('../repositories/barangStock');
const repoBarang = require('../repositories/repoBarang');
const regBencanaRepo = require('../repositories/registerBencana')

exports.showInTransaction = async (req, res) => {
  try {
    const data = await barangMasukRepo.setShowInTransaction(req.params.month, req.params.year, 'masuk');
    return res.status(200).json({ message: 'success', data: data });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.showOutTransaction = async (req, res) => {
  try {
    const data = await barangKeluarRepo.setOutTransaction(req.params.month, req.params.year, 'keluar');
    return res.status(200).json({ message: 'success', data: data });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.showInventoryThisMonth = async (req, res) => {
  try {
    const result = await barangStockRepo.setShowInventoryThisMonth();
    return res.status(200).json({ message: 'success', data: result });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.showInventoryByMonth = async (req, res) => {
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

exports.showRegisterBencana = async (req, res) => {
  try {
    const data = {
      month: req.params.month,
      year: req.params.year
    };
    const result = await regBencanaRepo.getAllRegBencana(data);
    return res.status(200).json({ message: 'success', data: result });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};