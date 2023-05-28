const express = require('express')
const readOnlyController = require('../controller/readOnly');
const middleware = require('../middlewares/authorization');

const router = express.Router();

router.get('/show-in/:month/:year', middleware.checkUserAuthorization, readOnlyController.showInTransaction);
router.get('/show-out/:month/:year', middleware.checkUserAuthorization, readOnlyController.showOutTransaction);
router.get('/show-inv-now', middleware.checkUserAuthorization, readOnlyController.showInventoryThisMonth);
router.get('/show-inv-past/:month/:year', middleware.checkUserAuthorization, readOnlyController.showInventoryByMonth);

module.exports = router;