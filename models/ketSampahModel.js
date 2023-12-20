module.exports = {
    fetchData: (db, callback)=> {
        db.query("SELECT * from keterangan_sampah ", callback);
    },
    insertData: (db, data, callback)=> {
        db.query("INSERT INTO keterangan_sampah SET ? ", data, callback);
    },

    updateData: (db, kategori_sampah, harga_beli, harga_jual, callback) => {
        const sql = "UPDATE keterangan_sampah SET Harga_beli = ?, Harga_jual = ? WHERE kategori_sampah = ?";
        db.query(sql, [harga_beli, harga_jual, kategori_sampah], callback);
    }
    
}