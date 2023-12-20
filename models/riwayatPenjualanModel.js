module.exports = {
    fetchData: (db, callback)=> {
        db.query("SELECT * from riwayat_penjualan ", callback);
    }
}