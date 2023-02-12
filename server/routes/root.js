const express = require('express')
const rootController = require('../controller/root')
const rootMiddleware = require('../middlewares/authorizationRoot')

const router = express.Router()

router.post('/auth/root-login', rootController.login)
router.get('/root-main', rootMiddleware.checkAuthorization, rootController.getAllAdmins)
router.post('/root-add-admin', rootMiddleware.checkAuthorization, rootController.addAdmin)

module.exports = router