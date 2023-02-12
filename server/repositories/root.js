const Admin = require('../models/admin')
const Root = require('../models/root')

exports.getRoot = async (username) => {
  const root = await Root.findOne({ where: username })
  if (root) {
    return root
  }
  else {
    return null
  }
}

exports.getAdmins = async () => {
  const admins = await Admin.findAll()
  return admins
}

exports.addAdmin = async (data) => {
  await Admin.create(data)
}