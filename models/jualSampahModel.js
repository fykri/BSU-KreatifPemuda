module.exports = {
    fetchData: (db, callback)=> {
        db.query("SELECT * from sampah_masuk ", callback);
    },
    
    insertData: (db, data, callback)=> {
        db.query("INSERT INTO riwayat_penjualan SET ? ", data, callback);
    }
}