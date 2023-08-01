const barangMasukRepo = require('../repositories/barangMasuk');

exports.showInTransaction = async (req, res) => {
  try {
    const data = await barangMasukRepo.setShowInTransaction(req.params.month, req.params.year, 'masuk');
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
      status: 'masuk',
      nama: req.body.nama,
      tanggal: new Date(),
      idBarang: req.body.idBarang
    };
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

exports.addNewItem = async (req, res) => {
  try {
    const data = {
      namaBarang: req.body.namaBarang,
      unit: req.body.unit,
      nama: req.body.namaPenambah,
      jumlah: req.body.jumlah,
      sumber: req.body.sumber,
      status: "masuk",
      tanggal: new Date()
    };
    await barangMasukRepo.setAddNewItem(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};
