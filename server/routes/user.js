const express = require('express')
const userController = require('../controller/user')
const rootMiddleware = require('../middlewares/authorizationRoot')

const router = express.Router()

router.post('/auth/root-login', userController.login)
router.post('/root-add-admin', rootMiddleware.checkAuthorization, userController.addAdmin)
router.get('/root-mainpage', rootMiddleware.checkAuthorization, userController.showAdmins)
router.delete('/root-remove-admin', rootMiddleware.checkAuthorization, userController.deleteAdmin)
router.put('/root-update-admin', rootMiddleware.checkAuthorization, userController.updateAdmin)

module.exports = router