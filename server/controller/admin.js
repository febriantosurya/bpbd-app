// const jwt = require('jsonwebtoken')
// const bcrypt = require("bcrypt");
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
      return res.json({ message: "Login Successfull" })
    }
    else {
      return res.json({ message: "Password incorrect"})
    }
    // let hash = bcrypt.compareSync(req.body.password, user.password);
    // if (!hash) {
    //     return res.send("incorrect password");
    // }    
    // const token = jwt.sign({
    //     data: user
    // }, `${process.env.SECRET_KEY}`, { expiresIn: '7d' })

    // return res.status(200).json({ message: "success", token: token })
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}