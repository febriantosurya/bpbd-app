const regBencanaRepo = require('../repositories/registerBencana');

exports.showAllRegBencanaByMonth = async (req, res) => {
  try {
    const data = {
      month: req.params.month,
      year: req.params.year
    };
    const result = await regBencanaRepo.getAllRegBencana(data);
    return res.status(200).json({ message: 'success', data: result });
  } 
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};