const rootRepos = require('../repositories/root')
const adminRepos = require('../repositories/admin')
const jwt = require('jsonwebtoken')
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
      const token = jwt.sign({
        data: root
      }, `${process.env.ROOT_SECRET_KEY}`, { expiresIn: '1h' })
      return res.status(200).json({ message: "success", token: token })
    }
    return res.json({ message: "password incorrect"})
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

exports.addAdmin = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const username = await adminRepos.getAdmin({ username: data.username })
    if (username !== null) {
      return res.status(400).json({ message: "failed username has been used" })
    }
    await rootRepos.addAdmin(data)
    return res.status(200).json({ message: "new admin added" })
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}