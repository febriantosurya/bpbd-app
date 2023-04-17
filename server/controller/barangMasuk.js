const barangMasukRepo = require('../repositories/barangMasuk');

exports.showInTransactionThisMonth = async (req, res) => {
  try {
    const data = await barangMasukRepo.setInTransaction();
    return res.status(200).json({ message: 'success', data: data });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.addInTransaction = async (req, res) => {
  try {
    const data = {
      jumlah: req.body.jumlah,
      status: req.body.status,
      nama: req.body.nama,
      tanggal: new Date(),
      idBarang: req.body.idBarang
    }
    await barangMasukRepo.setAddInTransaction(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.editVolInTransaction = async (req, res) => {
  try {
    const data = {
      id: req.body.idTransaksi,
      jumlah: req.body.jumlah
    };
    await barangMasukRepo.setEditInTransaction(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};