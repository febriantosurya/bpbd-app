const express = require('express');
const middleware = require('../middlewares/authorization');
const barangKeluarController = require('../controller/barangKeluar');

const router = express.Router();

router.get('/out/:month/:year', middleware.checkAdminAuthorization, barangKeluarController.showOutTransaction);
router.post('/out/add-data', middleware.checkAdminAuthorization, barangKeluarController.addOutTransaction);
router.put('/out/edit-data', middleware.checkAdminAuthorization, barangKeluarController.editVolOutTransaction);

module.exports = router;