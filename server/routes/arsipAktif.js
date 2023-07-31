const express = require('express');
const arsipAktifRepoController = require('../controller/arsipAktif');
const middleware = require('../middlewares/authorization')

const router = express.Router();

router.get('/show-data', middleware.checkAdminAndUser, arsipAktifRepoController.getArsipData);
router.get('/show-data/:day/:month/:year', middleware.checkAdminAndUser, arsipAktifRepoController.searchByDate);
router.get('/show-data/classify/:classify', middleware.checkAdminAndUser, arsipAktifRepoController.searchByCodeClassify);
router.get('/show-data/note/:note', middleware.checkAdminAndUser, arsipAktifRepoController.searchByNote);

router.post('/add-data', middleware.checkAdminAuthorization, arsipAktifRepoController.addArsipData);
router.delete('/del-data', middleware.checkAdminAuthorization, arsipAktifRepoController.delArsipData);
router.put('/edit-data', middleware.checkAdminAuthorization, arsipAktifRepoController.editArsipData);

module.exports = router;