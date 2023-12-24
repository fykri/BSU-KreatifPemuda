const sampah_masuk = require('../models/dashboardModel');

module.exports = {
    sampahMasuk: (req, res) => {  // Ubah nama fungsi agar tidak konflik dengan variabel
        sampah_masuk.fetchData(req.db, (err, row) => {
            if (err) {
                req.flash(`error ${err.message}`);
                return res.render('dashboard', { data: "", pesanError: req.flash('error') });
            }

            sampah_masuk.fetchData2(req.db, (err, rs) => {
                if (err) {
                    req.flash(`error ${err.message}`);
                    return res.render('dashboard', { data: "", pesanError: req.flash('error') });
                }

                // Ubah nama variabel agar tidak konflik dengan variabel luar
                const result = JSON.parse(JSON.stringify(row));
                const result2 = JSON.parse(JSON.stringify(rs));

                // Ubah properti yang dikirim ke view agar sesuai dengan nama variabel yang benar
                res.render('dashboard', { data: result, res: result2 });
            });
        });
    }
};
