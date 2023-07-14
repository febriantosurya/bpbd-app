const arsipAktifRepo = require('../repositories/arsipAktif')

exports.getArsipData = async (req, res) => {
  try {
    const result = await arsipAktifRepo.getData();
    return res.status(200).json({ message: 'success', data: result});
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

exports.addArsipData = async (req, res) => {
  try {
    const data = {
      noBerkas: req.body.noBerkas,
      noItemArsip: req.body.noItemArsip,
      kodeKlasifikasi: req.body.kodeKlasifikasi,
      uraianInfoArsip: req.body.uraianInfoArsip,
      jumlah: req.body.jumlah,
      keterangan: req.body.keterangan,
      tanggal: new Date()
    }
    await arsipAktifRepo.addData(data);
    return res.status(200).json({ message: 'success'});
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.editArsipData = async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      noBerkas: req.body.noBerkas,
      noItemArsip: req.body.noItemArsip,
      kodeKlasifikasi: req.body.kodeKlasifikasi,
      uraianInfoArsip: req.body.uraianInfoArsip,
      jumlah: req.body.jumlah,
      keterangan: req.body.keterangan
    }
    await arsipAktifRepo.editData(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.delArsipData = async (req, res) => {
  try {
    const id = req.body.id;
    await arsipAktifRepo.delData(id);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  }
}