const express = require('express');
const arsipAktifRepoController = require('../controller/arsipAktif');
const middleware = require('../middlewares/authorization')

const router = express.Router();

router.get('/show-data', middleware.checkAdminAuthorization, arsipAktifRepoController.getArsipData);
router.post('/add-data', middleware.checkAdminAuthorization, arsipAktifRepoController.addArsipData);
router.delete('/del-data', middleware.checkAdminAuthorization, arsipAktifRepoController.delArsipData);
router.put('/edit-data', middleware.checkAdminAuthorization, arsipAktifRepoController.editArsipData);

router.get('/show-data/:day/:month/:year', middleware.checkAdminAuthorization, arsipAktifRepoController.searchByDate);
router.get('/show-data/classify/:classify', middleware.checkAdminAuthorization, arsipAktifRepoController.searchByCodeClassify);
router.get('/show-data/note/:note', middleware.checkAdminAuthorization, arsipAktifRepoController.searchByNote);

module.exports = router;