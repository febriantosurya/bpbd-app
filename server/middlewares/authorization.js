const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.checkRootAuthorization = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: "failed, login is needed" }) 
  }
  const authSplit = authorization.split(' ')
  const [authType, authToken] = [
    authSplit[0],
    authSplit[1]
  ]
  if (authType !== 'Bearer') {
    res.status(401).json({ message: "invalid authorization" })
    return
  }
  try {
    const user = jwt.verify(authToken, process.env.ROOT_SECRET_KEY)
    req.user = user.data
    next()
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}

exports.checkAdminAuthorization = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: "failed, login is needed" }) 
  }
  const authSplit = authorization.split(' ')
  const [authType, authToken] = [
    authSplit[0],
    authSplit[1]
  ]
  if (authType !== 'Bearer') {
    res.status(401).json({ message: "invalid authorization" })
    return
  }
  try {
    const user = jwt.verify(authToken, process.env.ADMIN_SECRET_KEY)
    req.user = user.data
    next()
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}