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

exports.deleteAdmin = async (adminData) => {
  await Admin.destroy({ where: adminData })
}

exports.updateAdmin = async (id, adminData) => {
  const admin = await Admin.findOne({ where: {id: id} })
  admin.username = adminData.username
  admin.password = adminData.password
  admin.name = adminData.name
  admin.updatedAt = adminData.updatedAt
  admin.save()
  return admin
}