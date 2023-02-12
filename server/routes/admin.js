const express = require('express')
const adminController = require('../controller/admin')

const router = express.Router()

router.post('/login', adminController.login)
router.get('/root', adminController.showAllAdmins)

module.exports = router