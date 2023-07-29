const express = require('express');
const regBencanaNewController = require('../controller/registerBencanaNew');
const middleware = require('../middlewares/authorization');
const upload = require('../middlewares/uploadImages');

const router = express.Router();

router.get('/:month/:year', middleware.checkAdminAuthorization, regBencanaNewController.showAllRegBencanaByMonth);
router.post('/add-reg-bencana', middleware.checkAdminAuthorization, upload.array("images", 10), regBencanaNewController.addRegBencana);
router.put('/edit-reg-bencana', middleware.checkAdminAuthorization, regBencanaNewController.editRegBencana);
router.delete('/del-reg-bencana', middleware.checkAdminAuthorization, regBencanaNewController.deleteRegBencana);

module.exports = router;