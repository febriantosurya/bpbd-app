const Admin = require('../models/admin')

exports.getAdmin = async (username) => {
  const admin = await Admin.findOne({ where: username })
  if (admin) {
    return admin
  }
  else {
    return null
  }
}