const express = require('express');
const controller = require('../controller/dataDesKec');
const { checkAdminAuthorization } = require('../middlewares/authorization');

const router = express.Router();

router.get('/show-location', checkAdminAuthorization, controller.showData);

module.exports = router;