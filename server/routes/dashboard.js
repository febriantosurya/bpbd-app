const express = require('express');
const dashboardController = require('../controller/dashboard');
const { checkAdminAuthorization, checkUserAuthorization } = require('../middlewares/authorization');

const router = express.Router();

router.get('/a', checkAdminAuthorization, dashboardController.showDashboard);
router.get('/u', checkUserAuthorization, dashboardController.showDashboard);

module.exports = router;