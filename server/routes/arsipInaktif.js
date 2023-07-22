const express = require('express');
const arsipInaktifRepoController = require('../controller/arsipInaktif');
const middleware = require('../middlewares/authorization')

const router = express.Router();

router.get('/show-data', middleware.checkAdminAuthorization, arsipInaktifRepoController.getArsipData);
router.post('/add-data', middleware.checkAdminAuthorization, arsipInaktifRepoController.addArsipData);
router.delete('/del-data', middleware.checkAdminAuthorization, arsipInaktifRepoController.delArsipData);
router.put('/edit-data', middleware.checkAdminAuthorization, arsipInaktifRepoController.editArsipData);

router.get('/show-data/classify/:classify', middleware.checkAdminAuthorization, arsipInaktifRepoController.searchByCodeClassify);
router.get('/show-data/type/:type', middleware.checkAdminAuthorization, arsipInaktifRepoController.searchByType);

module.exports = router;