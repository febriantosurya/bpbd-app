const express = require('express');
const barangMasukController = require('../controller/barangMasuk');
const router = express.Router();

router.get('/in/this-month', barangMasukController.showInTransactionThisMonth);
router.post('/in/add-data', barangMasukController.addInTransaction);
router.put('/in/edit-data', barangMasukController.editVolInTransaction);

module.exports = router;