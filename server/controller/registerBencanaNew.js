const regBencanaNewRepo = require('../repositories/registerBencanaNew');

exports.showAllRegBencanaByMonth = async (req, res) => {
  try {
    const data = {
      month: req.params.month,
      year: req.params.year
    };
    const result = await regBencanaNewRepo.getAllRegBencana(data);
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
      keterangan: req.body.keterangan,
      lokasiDetail: req.body.lokasiDetail,
      kecamatan: req.body.kecamatan,
      tanggal: req.body.tanggal,
      waktu: req.body.waktu,
      desa: req.body.desa,
      korbanManusia: req.body.korbanManusia,
      korbanHewan: req.body.korbanHewan,
      korbanRumah: req.body.korbanRumah,
      korbanHarta: req.body.korbanHarta,
      korbanJalan: req.body.korbanJalan,
      totalKerugian: req.body.totalKerugian,
      penyebabKejadian: req.body.penyebabKejadian
    };
    await regBencanaNewRepo.addRegisterBencana(data);
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
      desa: req.body.desa,
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
    const dataRecord = await regBencanaNewRepo.getRegBencana(data.id);
    if (!dataRecord) {
      return res.status(404).json({ message: 'not found' });
    };
    await regBencanaNewRepo.editRegisterBencana(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.deleteRegBencana = async (req, res) => {
  try {
    const id = req.body.id;
    const dataRecord = await regBencanaNewRepo.getRegBencana(id);
    if (!dataRecord) {
      return res.status(404).json({ message: 'not found' });
    };
    await regBencanaNewRepo.deleteRegBencana(id);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};