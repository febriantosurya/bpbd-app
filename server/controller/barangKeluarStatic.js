const barangKeluarRepo = require('../repositories/barangKeluarStatic');

exports.showOutTransaction = async (req, res) => {
  try {
    const tanggal = {
      month: req.params.month,
      year: req.params.year
    };
    const data = await barangKeluarRepo.setOutTransaction(tanggal.month, tanggal.year, 'keluar');
    return res.status(200).json({ message: 'success', data: data });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.addOutTransaction = async (req, res) => {
  try {
    const data = {
      jumlah: req.body.jumlah,
      status: 'keluar',
      nama: req.body.nama,
      tanggal: new Date(),
      idBarang: req.body.idBarang
    };
    const result = await barangKeluarRepo.setAddOutTransaction(data);
    if (result === false) {
      return res.status(403).json({message: 'name failed'})
    }
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};

exports.editVolOutTransaction = async (req, res) => {
  try {
    const data = {
      id: req.body.idTransaksi,
      jumlah: req.body.jumlah
    };
    await barangKeluarRepo.setEditOutTransaction(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: `error ${error.message}` });
  };
};