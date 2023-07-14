const ArsipAktif = require('../models/arsipAktif');

exports.getData = async () => {
  const result = await ArsipAktif.findAll();
  return result;
}

exports.addData = async (data) => {
  await ArsipAktif.create({
    noBerkas: data.noBerkas,
    noItemArsip: data.noItemArsip,
    kodeKlasifikasi: data.kodeKlasifikasi,
    uraianInfoArsip: data.uraianInfoArsip,
    tanggal: data.tanggal,
    jumlah: data.jumlah,
    keterangan: data.keterangan
  });
  return;
};

exports.editData = async (data) => {
  let storedData = await ArsipAktif.findOne({
    where: {
      id: data.id
    }
  });
  storedData.noBerkas = data.noBerkas;
  storedData.noItemArsip = data.noItemArsip;
  storedData.kodeKlasifikasi = data.kodeKlasifikasi;
  storedData.uraianInfoArsip = data.uraianInfoArsip;
  storedData.jumlah = data.jumlah;
  storedData.keterangan = data.keterangan;
  storedData.save();
  return;
};

exports.delData = async (id) => {
  await ArsipAktif.destroy({
    where: {
      id: id
    }
  });
};