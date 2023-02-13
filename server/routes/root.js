const express = require('express')
const rootController = require('../controller/root')
const rootMiddleware = require('../middlewares/authorizationRoot')

const router = express.Router()

router.post('/auth/root-login', rootController.login)
router.get('/root-main', rootMiddleware.checkAuthorization, rootController.getAllAdmins)
router.post('/root-add-admin', rootMiddleware.checkAuthorization, rootController.addAdmin)
router.delete('/root-remove-admin', rootMiddleware.checkAuthorization, rootController.removeAdmin)
router.put('/root-update-admin', rootMiddleware.checkAuthorization, rootController.updateAdmin)

module.exports = router