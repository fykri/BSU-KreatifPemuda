const router = require('express').Router();
const jualSampahController = require('../controller/jualSampahController')

router.get('/', jualSampahController.jualSampah)
router.post('/insertData', jualSampahController.insertData)

module.exports = router;