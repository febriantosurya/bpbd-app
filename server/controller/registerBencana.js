const regBencanaRepo = require('../repositories/registerBencana');

exports.showAllRegBencanaByMonth = async (req, res) => {
  try {
    const data = {
      month: req.params.month,
      year: req.params.year
    };
    const result = await regBencanaRepo.getAllRegBencana(data);
    if (result.length > 0) {
      return res.status(200).json({ message: 'success', data: result });
    }
    else {
      return res.status(404).json({ message: 'no data' });
    }
  } 
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.addRegBencana = async (req, res) => {
  try {
    const data = {
      jenisBencana: req.body.jenisBencana,
      keterangan: req.body.keterangan,
      lokasiDetail: req.body.lokasiDetail,
      kecamatan: req.body.kecamatan,
      tanggal: req.body.tanggal,
      waktu: req.body.waktu,
      korbanManusia: req.body.Manusia,
      korbanHewan: req.body.Hewan,
      korbanRumah: req.body.Rumah,
      korbanHarta: req.body.Harta,
      korbanJalan: req.body.Jalan,
      totalKerugian: req.body.totalKerugian,
      penyebabKejadian: req.body.penyebab
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
      keterangan: req.body.keterangan,
      lokasiDetail: req.body.lokasiDetail,
      kecamatan: req.body.kecamatan,
      tanggal: req.body.tanggal,
      waktu: req.body.waktu,
      korbanManusia: req.body.korbanManusia,
      korbanHewan: req.body.korbanHewan,
      korbanRumah: req.body.korbanRumah,
      korbanHarta: req.body.korbanHarta,
      korbanJalan: req.body.korbanJalan,
      totalKerugian: req.body.totalKerugian,
      penyebabKejadian: req.body.penyebabKejadian
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