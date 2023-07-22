const ArsipInaktif = require('../models/arsipInaktif');
const { Op } = require('sequelize');

exports.getData = async () => {
  const result = await ArsipInaktif.findAll();
  return result;
};

exports.addData = async (data) => {
  await ArsipInaktif.create({
    kodeKlasifikasi: data.kodeKlasifikasi,
    jenisArsip: data.jenisArsip,
    kurunWaktu: data.kurunWaktu,
    tingkatPerkembangan: data.tingkatPerkembangan,
    jumlah: data.jumlah,
    keterangan: data.keterangan,
    nomorDefFolderDanBoks: data.nomorDefFolderDanBoks,
    lokasiSimpan: data.lokasiSimpan,
    jangkaSimpanDanNasibAkhir: data.jangkaSimpanDanNasibAkhir,
    kategoriArsip: data.kategoriArsip
  });
  return;
};

exports.editData = async (data) => {
  let storedData = await ArsipInaktif.findOne({
    where: {
      id : data.id
    }
  });
  storedData.kodeKlasifikasi = data.kodeKlasifikasi;
  storedData.jenisArsip = data.jenisArsip;
  storedData.kurunWaktu = data.kurunWaktu;
  storedData.tingkatPerkembangan = data.tingkatPerkembangan;
  storedData.jumlah = data.jumlah;
  storedData.keterangan = data.keterangan;
  storedData.nomorDefFolderDanBoks = data.nomorDefFolderDanBoks;
  storedData.lokasiSimpan = data.lokasiSimpan;
  storedData.jangkaSimpanDanNasibAkhir = data.jangkaSimpanDanNasibAkhir;
  storedData.kategoriArsip = data.kategoriArsip;
  storedData.save()
  return;
}

exports.delData = async (id) => {
  await ArsipInaktif.destroy({
    where: {
      id: id
    }
  });
  return;
}


// SEARCHING

exports.getByCodeClassify = async (data) => {
  const result = await ArsipInaktif.findAll({
    where: {
      kodeKlasifikasi: { [Op.iLike]: `%${data}%` }
    }
  });
  return result;
};

exports.getByType = async (data) => {
  const result = await ArsipInaktif.findAll({
    where: {
      jenisArsip: { [Op.iLike]: `%${data}%` }
    }
  });
  return result;
};