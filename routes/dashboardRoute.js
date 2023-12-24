const router = require('express').Router();
const dashboardController = require('../controller/dashboardController')

router.get('', dashboardController.sampahMasuk);
module.exports = router;