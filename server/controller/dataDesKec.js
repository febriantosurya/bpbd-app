const repo = require('../repositories/dataDesKec');

exports.showData = async (req, res) => {
  try {
    const result = await repo.getData();
    res.status(200).json({ message: "success", data: result });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};