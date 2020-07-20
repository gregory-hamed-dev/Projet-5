const express = require('express');
const router = express.Router();

const teddyCtrl = require('../controllers/teddy');
const { response } = require('express');

router.get('/', teddyCtrl.getAllTeddies);
router.get('/:id', teddyCtrl.getOneTeddy);
router.post('/order', teddyCtrl.orderTeddies);

module.exports = router;



