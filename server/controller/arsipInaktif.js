const arsipInaktifRepo = require('../repositories/arsipInaktif');

exports.getArsipData = async (req, res) => {
  try {
    const result = await arsipInaktifRepo.getData();
    return res.status(200).json({ message: 'success', data: result});
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.addArsipData = async (req, res) => {
  try {
    const data = {
      kodeKlasifikasi: req.body.kodeKlasifikasi,
      jenisArsip: req.body.jenisArsip,
      kurunWaktu: req.body.kurunWaktu,
      tingkatPerkembangan: req.body.tingkatPerkembangan,
      jumlah: req.body.jumlah,
      keterangan: req.body.keterangan,
      nomorDefFolderDanBoks: req.body.nomorDefFolderDanBoks,
      lokasiSimpan: req.body.lokasiSimpan,
      jangkaSimpanDanNasibAkhir: req.body.jangkaSimpanDanNasibAkhir,
      kategoriArsip: req.body.kategoriArsip
    }
    await arsipInaktifRepo.addData(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.editArsipData = async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      kodeKlasifikasi: req.body.kodeKlasifikasi,
      jenisArsip: req.body.jenisArsip,
      kurunWaktu: req.body.kurunWaktu,
      tingkatPerkembangan: req.body.tingkatPerkembangan,
      jumlah: req.body.jumlah,
      keterangan: req.body.keterangan,
      nomorDefFolderDanBoks: req.body.nomorDefFolderDanBoks,
      lokasiSimpan: req.body.lokasiSimpan,
      jangkaSimpanDanNasibAkhir: req.body.jangkaSimpanDanNasibAkhir,
      kategoriArsip: req.body.kategoriArsip
    }
    await arsipInaktifRepo.editData(data);
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

exports.delArsipData = async (req, res) => {
  try {
    await arsipInaktifRepo.delData( req.body.id );
    return res.status(200).json({ message: 'success' });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};