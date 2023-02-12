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
exports.getAdmins = async () => {
  const admins = await Admin.findAll()
  return admins
}

exports.addAdmin = async (username, password, name) => {
  await Admin.create({
    username: username,
    password: password,
    name: name
  })
}