const express = require('express')
const rootController = require('../controller/root')

const router = express.Router()

router.post('/root-login', rootController.login)
router.get('/root-main', rootController.getAllAdmins)

module.exports = router