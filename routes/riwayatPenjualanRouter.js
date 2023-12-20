const rwPenjualan = require('../controller/riwayatPenjualanController');
const { route } = require('./jualSampahRouter');
const router = require('express').Router();

router.get('/', rwPenjualan.tampilData);

module.exports = router;