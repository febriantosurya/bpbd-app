const express = require('express');
const middleware = require('../middlewares/authorization');
const barangStockController = require('../controller/barangStock');

const router = express.Router();

router.get('/', middleware.checkAdminAuthorization, barangStockController.showInventoryThisMonth);
router.get('/:month/:year', middleware.checkAdminAuthorization, barangStockController.showInventoryPastByMonth);
router.post('/update', middleware.checkAdminAuthorization, barangStockController.updateInvenPerMonth);
router.post('/update-note', middleware.checkAdminAuthorization, barangStockController.updateNoteInventory);

module.exports = router;