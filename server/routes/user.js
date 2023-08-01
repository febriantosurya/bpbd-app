const express = require('express')
const userController = require('../controller/user')
const middlware = require('../middlewares/authorization')

const router = express.Router()

router.post('/auth/login', userController.login)
router.post('/root-add-user', middlware.checkRootAuthorization, userController.addUser)
router.get('/root-admin', middlware.checkRootAuthorization, userController.showAdmin)
router.get('/root-user', middlware.checkRootAuthorization, userController.showUserReadOnly)
router.delete('/root-remove-user', middlware.checkRootAuthorization, userController.deleteUser)
router.put('/root-update-user', middlware.checkRootAuthorization, userController.updateUser)

module.exports = router