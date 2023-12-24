module.exports = {
    fetchData: (db, callback)=> {
        db.query("SELECT * from sampah_masuk ", callback);
    },
    
    fetchData2: (db, callback) => {
        db.query("SELECT * from riwayat_penjualan", callback);
    }
}