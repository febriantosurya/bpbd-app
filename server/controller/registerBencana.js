const regBencanaRepo = require('../repositories/registerBencana');

exports.showAllRegBencanaByMonth = async (req, res) => {
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

exports.addRegBencana = async (req, res) => {
  try {
    const data = {
      jenisBencana: req.body.jenisBencana,
      lokasiDetail: req.body.lokasiDetail,
      kecamatan: req.body.kecamatan,
      tanggal: new Date(),
      keterangan: req.body.keterangan,
      korbanManusia: req.body.korbanManusia,
      korbanHewan: req.body.korbanHewan,
      korbanHartaBenda: req.body.korbanHartaBenda,
      totalKerugian: req.body.totalKerugian
    };
    await regBencanaRepo.addRegisterBencana(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.editRegBencana = async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      jenisBencana: req.body.jenisBencana,
      lokasiDetail: req.body.lokasiDetail,
      kecamatan: req.body.kecamatan,
      keterangan: req.body.keterangan,
      korbanManusia: req.body.korbanManusia,
      korbanHewan: req.body.korbanHewan,
      korbanHartaBenda: req.body.korbanHartaBenda,
      totalKerugian: req.body.totalKerugian
    };
    const dataRecord = await regBencanaRepo.getRegBencana(data.id);
    if (!dataRecord) {
      return res.status(404).json({ message: 'not found' });
    };
    await regBencanaRepo.editRegisterBencana(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.deleteRegBencana = async (req, res) => {
  try {
    const id = req.body.id;
    const dataRecord = await regBencanaRepo.getRegBencana(id);
    if (!dataRecord) {
      return res.status(404).json({ message: 'not found' });
    };
    await regBencanaRepo.deleteRegBencana(id);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};