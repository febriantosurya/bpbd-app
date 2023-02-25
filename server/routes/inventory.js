const express = require('express');
const middlware = require('../middlewares/authorization');
const inventoryController = require('../controller/inventory');

const router = express.Router();

router.get('/inventory/:year', middlware.checkAdminAuthorization, inventoryController.getInventoryByYear);
router.post('/inventory/add', middlware.checkAdminAuthorization, inventoryController.addInventory);
router.put('/inventory/update', middlware.checkAdminAuthorization, inventoryController.updateInventory);

module.exports = router;