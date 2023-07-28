const InvBarangStatic = require('../models/invBarangStatic');
const InvGudangAktifStatic = require('../models/invGudangAktifStatic');
const InvGudangLamaStatic = require('../models/invGudangLamaStatic');
const InvTransaksiGudangStatic = require('../models/invTransaksiGudangStatic');
const sequelize = require('../configs/database');
const {Op} = require('sequelize');

// show data
exports.getTransaction = async (month, year, statusBarang) => {
    const result = await InvBarangStatic.findAll({
        include: {
            model: InvTransaksiGudangStatic,
            attributes: {
                exclude: ['status']
            },
            where: {
                [Op.and]: [
                    sequelize.fn('EXTRACT(MONTH from "tanggal") =', month),
                    sequelize.fn('EXTRACT(YEAR from "tanggal") =', year), {
                        status: statusBarang
                    }
                ]
            },
            required: false
        }
    });
    return result;
};

exports.sumVolumeTransaction = async (month, year, statusBarang, idBarang) => {
    const result = await InvTransaksiGudangStatic.findOne({
        where: {
            [Op.and]: [
                sequelize.fn('EXTRACT(MONTH from "tanggal") =', month),
                sequelize.fn('EXTRACT(YEAR from "tanggal") =', year), {
                    status: statusBarang,
                    InvBarangStaticId: idBarang
                }
            ]
        },
        attributes: [sequelize.fn("SUM", sequelize.col("jumlah"))],
        raw: true
    });
    return result.sum;
};

exports.getVolumePastMonth = async (pastMonth, year, idBarang) => {
    const result = await InvGudangLamaStatic.findOne({
        where: {
            [Op.and]: [
                sequelize.fn('EXTRACT(MONTH from "tanggal") =', pastMonth),
                sequelize.fn('EXTRACT(YEAR from "tanggal") =', year), {
                    InvBarangStaticId: idBarang
                }
            ]
        },
        attributes: ['jumlah']
    });
    if (result) {
        return result.dataValues.jumlah;
    } else {
        return null;
    };
};

// add & edit data
exports.addTransaction = async (data) => {
    await InvTransaksiGudangStatic.create({
        jumlah: data.jumlah,
        status: data.status,
        nama: data.nama,
        tanggal: data.tanggal,
        InvBarangStaticId: data.idBarang
    });
    return;
};

exports.editTransaction = async (data) => {
    if (data.jumlah === 0) {
        await InvTransaksiGudangStatic.destroy({
            where: {
                id: data.id
            }
        });
    } else {
        const dataDb = await InvTransaksiGudangStatic.findOne({
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
    const result = await InvBarangStatic.create({
        nama: data.namaBarang, 
        unit: data.unit, 
        sumber: data.sumber, 
        jenis: data.jenis
    });
    return result;
};

// INVENTORY
exports.getInventoryThisMonth = async () => {
    const result = await InvBarangStatic.findAll({
        include: {
            model: InvGudangAktifStatic,
            attributes: {
                exclude: ['InvBarangStaticId']
            }
        }
    });
    return result;
};

exports.getInventoryByMonth = async (data) => {
    const result = await InvBarangStatic.findAll({
        include: {
            model: InvGudangLamaStatic,
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
    await InvGudangAktifStatic.create({tanggal: data.tanggal, jumlah: data.jumlah, InvBarangStaticId: data.idBarang});
    return;
};

exports.updateInvenActive = async (data) => {
    const result = await InvGudangAktifStatic.findOne({
        where: {
            InvBarangStaticId: data.idBarang
        }
    });
    if (result) {
        result.jumlah = data.jumlah;
        result.save()
        return result;
    };
    return null;
};

exports.addInvenDump = async (data) => {
    await InvGudangLamaStatic.create({tanggal: data.tanggal, jumlah: data.jumlah, keterangan: data.keterangan, InvBarangStaticId: data.idBarang});
    return;
};

exports.addNoteToInventory = async (data) => {
    await InvGudangAktifStatic.update({
        keterangan: data.note,
        kondisi: data.kondisi
    }, {
        where: {
            id: data.id
        }
    });
    return;
};

// CHECK MONTH AND UPDATE MONTH FROM INVEN ACTIVE
exports.getAllInvenActive = async (data) => {
    const result = await InvGudangAktifStatic.findAll({
        where: {
            [Op.and]: [
                sequelize.fn('EXTRACT(MONTH from "tanggal") =', data.month),
                sequelize.fn('EXTRACT(YEAR from "tanggal") =', data.year)
            ]
        },
        attributes: {
            exclude: ['id']
        }
    });
    return result;
};

exports.updateAllDateInvenActive = async (date, month) => {
    await InvGudangAktifStatic.update({
        tanggal: date
    }, {
        where: sequelize.fn('EXTRACT(MONTH from "tanggal") =', month)
    });
    return;
};
