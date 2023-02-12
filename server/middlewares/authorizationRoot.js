const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.checkAuthorization = (req, res, next) => {
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
    const root = jwt.verify(authToken, process.env.ROOT_SECRET_KEY)
    req.root = root.data
    next()
  } catch (error) {
    return res.status(400).json({ message: `failed ${error.message}` })
  }
}