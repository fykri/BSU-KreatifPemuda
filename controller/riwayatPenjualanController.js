const riwayatPenjualan = require('../models/riwayatPenjualanModel')

module.exports = {
    tampilData: (req, res) => {
        riwayatPenjualan.fetchData(req.db, (err, row) => {
            if (err) {
                req.flash(`error ${err.message}`);
                res.render('riwayatPenjualan', { data: "", pesanError: req.flash('error') });
            } else {
                const result = JSON.parse(JSON.stringify(row));
                res.render('riwayatPenjualan', { data: result });
            }
        });
    }
}