const RegBencana = require('../models/registerBencanaNew');
const sequelize = require('../configs/database');
const { Op } = require('sequelize');

exports.totalKejadian = async (jenisBencana) => {
  const tanggal = new Date()
  const result = await RegBencana.findOne({
    where: {
      [Op.and]: [
        sequelize.fn('EXTRACT(MONTH from "tanggal") =', tanggal.getMonth() + 1),
        sequelize.fn('EXTRACT(YEAR from "tanggal") =', tanggal.getFullYear()),
        {
          jenisBencana: jenisBencana
        }
      ]
    },
    attributes: [sequelize.fn("COUNT", sequelize.col("jenisBencana"))],
    raw: true
  });
  return result.count;
};