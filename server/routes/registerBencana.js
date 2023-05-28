const express = require('express');
const regBencanaController = require('../controller/registerBencana');
const middleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/:month/:year', middleware.checkAdminAuthorization, regBencanaController.showAllRegBencanaByMonth);
router.post('/add-reg-bencana', middleware.checkAdminAuthorization, regBencanaController.addRegBencana);
router.put('/edit-reg-bencana', middleware.checkAdminAuthorization, regBencanaController.editRegBencana);
router.delete('/del-reg-bencana', middleware.checkAdminAuthorization, regBencanaController.deleteRegBencana);

module.exports = router;