const router = require('express').Router();
const ketSampahController = require('../controller/ketSampahController')

router.get('/', ketSampahController.keteranganSampah);
router.put('/update', ketSampahController.update)

module.exports = router;