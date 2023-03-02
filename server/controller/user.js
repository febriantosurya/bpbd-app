const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user')

exports.login = async (req, res) => {
  try {
    const username = { username : req.body.username };
    const user = await userRepo.getUser(username);
    if (user === null) {
      return res.status(400).json({ message: "failed, username incorrect" });
    };
    const password = req.body.password;
    if (password != user.password) {
      return res.status(400).json({ message: "failed, password incorrect" });
    };
    if (user.level === 0) {
      const token = jwt.sign({
        data: user
      }, `${process.env.ROOT_SECRET_KEY}`, { expiresIn: '1h' });
      return res.status(200).json({ message: "success", rootToken: token });
    }
    else if (user.level === 1) {
      const token = jwt.sign({
        data: user
      }, `${process.env.ADMIN_SECRET_KEY}`, { expiresIn: '1h' });
      return res.status(200).json({ message: "success", adminToken: token });
    };
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  };
};

//==================ADMINS==================
exports.showAdmins = async (req, res) => {
  try {
    admins = await userRepo.getUsers({ level: 1 })
    return res.status(200).json({ message: "success", data: admins })
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.addAdmin = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      level: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const username = await userRepo.getUser({ username: data.username })
    if (username !== null) {
      return res.status(400).json({ message: "failed username has been used" })
    }
    await userRepo.addUser(data)
    return res.status(200).json({ message: "new user added" })
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.updateAdmin = async (req, res) => {
  try {
    const id = { id: req.body.id }
    const data = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      level: 1,
      updatedAt: new Date()
    }
    await userRepo.updateUser(id, data)
    return res.status(200).json({ message: "user updated" })
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error}` })
  }
}

exports.deleteAdmin = async (req, res) => {
  try {
    const username = { username: req.body.username }
    user = await userRepo.getUser(username)
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    else if (user.level == 0) {
      return res.status(403).json({ message: "root cannot be deleted" })
    }
    await userRepo.deleteUser(username)
    return res.status(200).json({ message: "delete success" })
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}