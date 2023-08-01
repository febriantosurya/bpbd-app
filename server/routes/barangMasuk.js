const express = require('express');
const middleware = require('../middlewares/authorization');
const barangMasukController = require('../controller/barangMasuk');

const router = express.Router();

router.get('/in/:month/:year', middleware.checkAdminAndUser, barangMasukController.showInTransaction);
router.post('/in/add-data', middleware.checkAdminAuthorization, barangMasukController.addInTransaction);
router.put('/in/edit-data', middleware.checkAdminAuthorization, barangMasukController.editVolInTransaction);
router.post('/in/new-item', middleware.checkAdminAuthorization, barangMasukController.addNewItem);

module.exports = router;