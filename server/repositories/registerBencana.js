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