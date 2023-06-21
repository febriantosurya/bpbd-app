const RegBencana = require('../models/registerBencana');
const sequelize = require('../configs/database');
const { Op } = require('sequelize');

// GET DATA
exports.getAllRegBencana = async (data) => {
  const result = await RegBencana.findAll({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "tanggal") =', data.month),
        sequelize.fn('EXTRACT(YEAR from "tanggal") =', data.year)
      ]
    }
  });
  if (!result) return null;
  return result;
};

exports.getRegBencana = async (id) => {
  const result = await RegBencana.findOne({
    where: {
      id: id
    }
  })
  if (!result) return null
  return result
};

// END

exports.addRegisterBencana = async (data) => {
  await RegBencana.create(data);
  return;
};

exports.editRegisterBencana = async (data) => {
  let data_stored = await RegBencana.findOne({
    where: {
      id: data.id
    }
  });
  data_stored.jenisBencana = data.jenisBencana;
  data_stored.keterangan = data.keterangan;
  data_stored.lokasiDetail = data.lokasiDetail;
  data_stored.kecamatan = data.kecamatan;
  data_stored.tanggal = data.tanggal;
  data_stored.waktu = data.waktu;
  data_stored.korbanManusia = data.korbanManusia;
  data_stored.korbanHewan = data.korbanHewan;
  data_stored.korbanRumah = data.korbanRumah;
  data_stored.korbanHarta = data.korbanHarta;
  data_stored.korbanJalan = data.korbanJalan;
  data_stored.totalKerugian = data.totalKerugian;
  data_stored.penyebabKejadian = data.penyebabKejadian;
  data_stored.save();
  return;
};

exports.deleteRegBencana = async (id) => {
  await RegBencana.destroy({
    where: {
      id: id
    }
  });
  return;
};