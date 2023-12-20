const sampah_masuk = require('../models/sampahMaskModel');
const database = require('../database');

function getTotalHarga(jenis_sampah, berat_sampah) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Harga_beli FROM keterangan_sampah";
        let tot_harga;

        database.query(sql, (err, res) => {
            if (err) {
                console.error('Error executing the query:', err);
                reject(err);
                return;
            }

            const harga_beli = JSON.parse(JSON.stringify(res));

            switch (jenis_sampah) {
                case 'Kaca':
                    tot_harga = harga_beli[0].Harga_beli * berat_sampah;
                    break;
                case 'Kertas':
                    tot_harga = harga_beli[1].Harga_beli * berat_sampah;
                    break;
                case 'Logam':
                    tot_harga = harga_beli[2].Harga_beli * berat_sampah;
                    break;
                case 'Plastik':
                    tot_harga = harga_beli[3].Harga_beli * berat_sampah;
                    break;
                default:
                    console.log('Invalid jenis_sampah');
                    reject('Invalid jenis_sampah');
            }

            resolve(tot_harga);
        });
    });
}

module.exports = {
    sampahMasuk: (req, res) => {
        sampah_masuk.fetchData(req.db, (err, row) => {
            if (err) {
                req.flash(`error ${err.message}`);
                res.render('sampahMasuk', { data: "", pesanError: req.flash('error') });
            } else {
                const result = JSON.parse(JSON.stringify(row));
                res.render('sampahMasuk', { data: result });
            }
        });
    },

    tambahSampah: async (req, res) => {
        try {
            const { jenis_sampah, tanggal_masuk, berat_sampah } = req.body;
            const total_harga = await getTotalHarga(jenis_sampah, berat_sampah);
            const id = "";
            let form_data = {
                id,
                tanggal_masuk,
                jenis_sampah,
                berat_sampah,
                total_harga
            };

            sampah_masuk.insertData(req.db, form_data, (err, row) => {
                if (err) {
                    req.flash('error', `${err.message}`);
                    res.redirect('/sampahMasuk');
                } else {
                    req.flash('success', `Tambah data berhasil`)
                    res.redirect('/sampahMasuk');
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    },

    hapusData: (req, res) => {
        const {id} = req.params;
        sampah_masuk.deleteData(req.db, id, (err)=> {
            if(err){
                req.flash('error', `${err.message}`)
                res.redirect('/sampahMasuk')
            } else{
                req.flash('success', 'Data Berhasil Di Hapus')
                res.redirect('/sampahMasuk')
            } 
        })
    },

    update: async (req, res) => {
        try{
            const { id, tanggal_masuk, jenis_sampah, berat_sampah} = req.body;
            const total_harga_new = await getTotalHarga(jenis_sampah, berat_sampah);
            sampah_masuk.updateData(req.db, id, tanggal_masuk, jenis_sampah, berat_sampah, total_harga_new, (err, result) => {
            if (err) {
                req.flash('error', `Error updating data: ${err.message}`);
                return res.redirect('/sampahMasuk');
            }
            
            req.flash('success', 'Data berhasil diupdate');
            res.redirect('/sampahMasuk');
        });
        } catch (err) {
            console.log(err);
        }

        
    }
}
