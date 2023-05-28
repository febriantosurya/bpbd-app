const InvBarang = require('../models/invBarang');
const InvGudangAktif = require('../models/invGudangAktif');
const InvGudangLama = require('../models/invGudangLama');
const InvTransaksiGudang = require('../models/invTransaksiGudang');
const sequelize = require('../configs/database');
const { Op, QueryTypes, where } = require('sequelize');

// show data
exports.getTransaction = async (month, year, statusBarang) => {
  const result = await InvBarang.findAll({
    include: {
      model: InvTransaksiGudang,
      attributes: { exclude: ['status'] },
      where: {
        [Op.and]: [
          sequelize.fn('EXTRACT(MONTH from "tanggal") =', month),
          sequelize.fn('EXTRACT(YEAR from "tanggal") =', year),
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

exports.sumVolumeTransaction = async (month, year, statusBarang, idBarang) => {
  const result = await InvTransaksiGudang.findOne({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "tanggal") =', month),
        sequelize.fn('EXTRACT(YEAR from "tanggal") =', year),
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

exports.getVolumePastMonth = async (pastMonth, year, idBarang) => {
  const result = await InvGudangLama.findOne({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "tanggal") =', pastMonth),
        sequelize.fn('EXTRACT(YEAR from "tanggal") =', year),
        {
          InvBarangId: idBarang
        }
      ]
    },
    attributes: ['jumlah']
  });
  if (result) {
    return result.dataValues.jumlah;
  }
  else {
    return null;
  }
}

// add & edit data
exports.addTransaction = async (data) => {
  await InvTransaksiGudang.create({
    jumlah: data.jumlah,
    status: data.status,
    nama: data.nama,
    tanggal: data.tanggal,
    InvBarangId: data.idBarang
  });
  return;
};

exports.editTransaction = async (data) => {
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
  return;
};

exports.addNewItem = async (data) => {
  const result = await InvBarang.create({
    nama: data.namaBarang,
    unit: data.unit
  });
  return result;
};

// INVENTORY
exports.getInventoryThisMonth = async () => {
  const result = await InvBarang.findAll({
    include: {
      model: InvGudangAktif,
      attributes: { exclude: ['InvBarangId'] }
    }
  });
  return result;
};

exports.getInventoryByMonth = async (data) => {
  const result = await InvBarang.findAll({
    include: { 
      model: InvGudangLama,
      where: {
        [Op.and]: [
          sequelize.fn('EXTRACT(MONTH from "tanggal") =', data.month),
          sequelize.fn('EXTRACT(YEAR from "tanggal") =', data.year)
        ]
      }
    }
  });
  return result;
};

exports.addInvenActive = async (data) => {
  await InvGudangAktif.create({
    tanggal: data.tanggal,
    jumlah: data.jumlah,
    InvBarangId: data.idBarang
  });
  return;
};

exports.updateInvenActive = async (data) => {
  const result = await InvGudangAktif.findOne({ 
    where: {
      InvBarangId: data.idBarang
    }
  });
  if (result) {
    result.jumlah = data.jumlah;
    result.save()
    return result;
  }
  return null;
}

exports.addInvenDump = async (data) => {
  await InvGudangLama.create({
    tanggal: data.tanggal,
    jumlah: data.jumlah,
    keterangan: data.keterangan,
    InvBarangId: data.idBarang
  })
  return;
}

exports.addNoteToInventory = async (data) => {
  await InvGudangAktif.update({
    keterangan: data.note
  },
  {
    where: { id: data.id }
  });
  return;
}

// CHECK MONTH AND UPDATE MONTH FROM INVEN ACTIVE
exports.getAllInvenActive = async (data) => {
  const result = await InvGudangAktif.findAll({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "tanggal") =', data.month),
        sequelize.fn('EXTRACT(YEAR from "tanggal") =', data.year)
      ]
    },
    attributes: { exclude: ['id'] }
  });
  return result;
};

exports.updateAllDateInvenActive = async (date, month) => {
  await InvGudangAktif.update({
    tanggal: date
  }, {
    where: sequelize.fn('EXTRACT(MONTH from "tanggal") =', month)
  });
  return;
};