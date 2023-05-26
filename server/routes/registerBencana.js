const express = require('express');
const regBencanaController = require('../controller/registerBencana');

const router = express.Router();

router.get('/:month/:year', regBencanaController.showAllRegBencanaByMonth);
router.post('/add-reg-bencana', regBencanaController.addRegBencana);
router.put('/edit-reg-bencana', regBencanaController.editRegBencana);
router.delete('/del-reg-bencana', regBencanaController.deleteRegBencana);

module.exports = router;