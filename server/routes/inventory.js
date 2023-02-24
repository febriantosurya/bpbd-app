const express = require('express');
const middlware = require('../middlewares/authorization');
const inventoryController = require('../controller/inventory');

const router = express.Router();

router.get('/admin-mainpage', middlware.checkAdminAuthorization, inventoryController.getInventoryByYear);

module.exports = router;