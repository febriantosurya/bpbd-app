const express = require('express')
const userController = require('../controller/user')
const middlware = require('../middlewares/authorization')

const router = express.Router()

router.post('/auth/login', userController.login)
router.post('/root-add-admin', middlware.checkRootAuthorization, userController.addAdmin)
router.get('/root-mainpage', middlware.checkRootAuthorization, userController.showAdmins)
router.delete('/root-remove-admin', middlware.checkRootAuthorization, userController.deleteAdmin)
router.put('/root-update-admin', middlware.checkRootAuthorization, userController.updateAdmin)

module.exports = router