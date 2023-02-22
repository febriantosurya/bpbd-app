const User = require('../models/user');

exports.getUser = async (username) => {
  user = await User.findOne({ where: username })
  if (user) {
    return user
  } 
  else {
    return null
  }
}

exports.getUsers = async (level) => {
  users =  await User.findAll({ where: level })
  if (users) {
    return users
  }
  else {
    return null
  }
}

exports.addUser = async (data) => {
  await User.create(data)
}

exports.deleteUser = async (username) => {
  await User.destroy({ where: username })
}

exports.updateUser = async (id, data) => {
  const admin = await User.findOne({ where: id })
  admin.username = data.username
  admin.password = data.password
  admin.name = data.name
  admin.updatedAt = data.updatedAt
  admin.save()
  return admin
}