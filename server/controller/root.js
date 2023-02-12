const rootRepos = require('../repositories/root')
require('dotenv').config()

exports.login = async (req, res) => {
  try {
    const username = { username : req.body.username }
    const root = await rootRepos.getRoot(username)
    if (root === null) {
      return res.status(400).json({ message: "failed, username incorrect" })
    }
    const password = req.body.password
    if (password === root.password) {
      return res.json({ message: "login success" })
    }
    else {
      return res.json({ message: "password incorrect"})
    }
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await rootRepos.getAdmins()
    return res.status(200).json({ message: "success", data: admins });
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}