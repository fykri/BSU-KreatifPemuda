const jSampah = require('../models/jualSampahModel')
const database = require('../database');
const { json } = require('body-parser');

module.exports = {
    jualSampah: (req, res) => {
        jSampah.fetchData(req.db, (err, row) => {
            if (err) {
                req.flash(`error ${err.message}`);
                res.render('jualSampah', { data: "", pesanError: req.flash('error') });
            } else {
                const result = JSON.parse(JSON.stringify(row));
                res.render('jualSampah', { data: result });
            }
        });
    },

    insertData: (req, res)=> {
        const {id_jualSampah, nama_pengepul,tanggal_jual, jenis_sampah, berat_sampah, harga} = req.body;
        const id_jual = id_jualSampah.split(",")
        console.log(id_jual);
        const id_keluar = '';
        const data = {
            id_keluar,
            nama_pengepul,
            tanggal_keluar : tanggal_jual,
            jenis_sampah,
            total_berat : berat_sampah,
            pendapatan: harga
        }


        jSampah.insertData(req.db, data, (err, row)=> {
            if (err) {
                req.flash('error', `${err.message}`);
                res.redirect('/jualSampah');
            } else {
                for(let x of id_jual) {
                    const sql = `DELETE FROM sampah_masuk WHERE id  = ${x}`;
                    database.query(sql, (err, result) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log('berhasil');
                    }
                });
                }
        
                req.flash('success', `Jual Sampah Berhasil`)
                res.redirect('/jualSampah');
            }
        })
    }
    
}