const Kecamatan = require('../models/dataKecamatan');
const Desa = require('../models/dataDesa');

exports.getData = async () => {
  const result = await Kecamatan.findAll({
    include: {
      model: Desa,
      attributes: {
        exclude: ['KecamatanId']
      }
    }
  });
  return result;
};