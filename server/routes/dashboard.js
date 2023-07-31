const express = require('express');
const dashboardController = require('../controller/dashboard');
const { checkAdminAndUser } = require('../middlewares/authorization');

const router = express.Router();

router.get('/', checkAdminAndUser, dashboardController.showDashboard);

module.exports = router;