const router = require('express').Router();
const sampahMasuk = require('../controller/sampahMasukController')
router.get('/', sampahMasuk.sampahMasuk)
router.post('/tambahSampah', sampahMasuk.tambahSampah)
router.delete('/delete/:id', sampahMasuk.hapusData)
router.put('/update', sampahMasuk.update)
module.exports = router;