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
      return res.status(200).json({ message: "success", token: token, level: user.level });
    }
    else if (user.level === 1) {
      const token = jwt.sign({
        data: user
      }, `${process.env.ADMIN_SECRET_KEY}`, { expiresIn: '1h' });
      return res.status(200).json({ message: "success", token: token, level: user.level });
    }
    else if (user.level == 2) {
      const token = jwt.sign({
        data: user
      }, `${process.env.USER_SECRET_KEY}`, { expiresIn: '1h' });
      return res.status(200).json({ message: "success", token: token, level: user.level });
    };
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  };
};

//==================USERS==================
exports.showAdmin = async (req, res) => {
  try {
    admins = await userRepo.getUsers({ level: 1 })
    return res.status(200).json({ message: "success", data: admins})
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.showUserReadOnly = async (req, res) => {
  try {
    users = await userRepo.getUsers({ level: 2 })
    return res.status(200).json({ message: "success", data: users})
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.addUser = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      level: req.body.level,
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

exports.updateUser = async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      updatedAt: new Date()
    }
    await userRepo.updateUser(data)
    return res.status(200).json({ message: "user updated" })
  }
  catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.deleteUser = async (req, res) => {
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