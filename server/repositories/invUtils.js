const InvBarang = require('../models/invBarang');
const InvGudangAktif = require('../models/invGudangAktif');
const InvGudangLama = require('../models/invGudangLama');
const InvTransaksiGudang = require('../models/invTransaksiGudang');
const sequelize = require('../configs/database');
const { Op } = require('sequelize');

// show data
exports.getInTransaction = async (month, statusBarang) => {
  const result = await InvBarang.findAll({
    include: {
      model: InvTransaksiGudang,
      attributes: { exclude: ['status'] },
      where: {
        [Op.and]: [
          sequelize.fn('EXTRACT(MONTH from "tanggal") =', month),
          {
            status: statusBarang,
          }
        ]
      },
      required: false
    }
  });
  return result;
}

exports.sumVolumeTransaction = async (month, statusBarang, idBarang) => {
  const result = await InvTransaksiGudang.findOne({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "tanggal") =', month),
        {
          status: statusBarang,
          InvBarangId: idBarang
        }
      ]
    },
    attributes: [sequelize.fn("SUM", sequelize.col("jumlah"))],
    raw: true
  });
  return result.sum;
}

exports.getVolumePastMonth = async (pastMonth, idBarang) => {
  const result = await InvGudangLama.findOne({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "tanggal") =', pastMonth),
        {
          InvBarangId: idBarang
        }
      ]
    },
    attributes: ['jumlah']
  });
  return result.dataValues.jumlah;
}

// add data
exports.addInTransaction = async (data) => {
  await InvTransaksiGudang.create({
    jumlah: data.jumlah,
    status: data.status,
    nama: data.nama,
    tanggal: data.tanggal,
    InvBarangId: data.idBarang
  });
  return;
};

exports.editInTransaction = async (data) => {
  if (data.jumlah === 0) {
    await InvTransaksiGudang.destroy({
      where: { id: data.id }
    });
  }
  else {
    const dataDb = await InvTransaksiGudang.findOne({
      where: {
        id: data.id
      }
    });
    dataDb.jumlah = data.jumlah;
    dataDb.save();
  };
};