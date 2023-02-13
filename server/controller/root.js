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
      createdAt: new Date(),
      updatedAt: new Date()
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

exports.removeAdmin = async (req, res) => {
  console.log("test")
  try {
    const adminData = { id: req.body.id, username: req.body.username }
    await rootRepos.deleteAdmin(adminData)
    return res.status(200).json({ message: `${adminData.username} removed` })
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.updateAdmin = async (req, res) => {
  try {
    const id = req.body.id
    const adminData = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      updatedAt: new Date()
    }
    const adminUpdate = await rootRepos.updateAdmin(id, adminData)
    return res.status(200).json({ message: "update success", data: adminUpdate })
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}