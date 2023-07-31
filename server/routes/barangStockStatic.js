const express = require('express');
const middleware = require('../middlewares/authorization');
const barangStockController = require('../controller/barangStockStatic');

const router = express.Router();
// middleware.checkAdminAuthorization,
router.get('/', middleware.checkAdminAndUser, barangStockController.showInventoryThisMonth);
router.get('/:month/:year', middleware.checkAdminAuthorization, barangStockController.showInventoryPastByMonth);
router.post('/update', middleware.checkAdminAuthorization, barangStockController.updateInvenPerMonth);
router.post('/update-note', middleware.checkAdminAuthorization, barangStockController.updateNoteInventory);

module.exports = router;