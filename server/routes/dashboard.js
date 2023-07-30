const express = require('express');
const dashboardController = require('../controller/dashboard');
const { checkAdminAuthorization, checkUserAuthorization, checkAdminAndUser } = require('../middlewares/authorization');

const router = express.Router();

router.get('/', checkAdminAndUser, dashboardController.showDashboard);

module.exports = router;