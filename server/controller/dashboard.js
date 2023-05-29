const repoDashboard = require('../repositories/dashboard');

exports.showDashboard = async (req, res) => {
  try {
    const data = ['Banjir', 'Banjir Bandang' , 'Kebakaran', 'Angin'];
    result = {};
    for (let i = 0; i < data.length; i++) {
      temp = await repoDashboard.totalKejadian(data[i]);
      result[data[i]] = temp;
    };
    return res.status(200).json({ message: 'success', data: result });
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  };
};