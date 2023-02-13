const adminRepos = require('../repositories/admin')
require('dotenv').config()

exports.login = async (req, res) => {
  try {
    const username = { username : req.body.username }
    const admin = await adminRepos.getAdmin(username)
    if (admin === null) {
      return res.status(400).json({ message: "failed, username not registered" })
    }
    const password = req.body.password
    if (password === admin.password) {
      return res.json({ message: "login success" })
    }
    else {
      return res.json({ message: "password incorrect"})
    }
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}