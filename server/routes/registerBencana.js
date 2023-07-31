const express = require('express');
const regBencanaController = require('../controller/registerBencana');
const middleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/:month/:year', middleware.checkAdminAndUser, regBencanaController.showAllRegBencanaByMonth);

module.exports = router;