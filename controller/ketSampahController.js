const ketSampah = require('../models/ketSampahModel')

module.exports = {
    keteranganSampah: (req, res)=> {
        ketSampah.fetchData(req.db, (err, row)=> {
            if(err){
                req.flash(`error ${err.massage}`)
                res.render('keteranganSampah', {data: "", pesanError: req.flash('error')})
            } else {
                const result = JSON.parse(JSON.stringify(row))
                res.render('keteranganSampah', {data:result})
            }
        })
    },

    update: (req, res) => {
        const { kategori_sampah, harga_jual, harga_beli } = req.body;
        ketSampah.updateData(req.db, kategori_sampah, harga_beli, harga_jual, (err, result) => {
            if (err) {
                req.flash('error', `Error updating data: ${err.message}`);
                return res.redirect('/keteranganSampah');
            }
            
            req.flash('success', 'Data berhasil diupdate');
            res.redirect('/keteranganSampah');
        });
    }
    
}