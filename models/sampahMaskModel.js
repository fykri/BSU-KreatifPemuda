module.exports = {
    fetchData: (db, callback)=> {
        db.query("SELECT * from sampah_masuk ", callback);
    },
    insertData: (db, data, callback)=> {
        db.query("INSERT INTO sampah_masuk SET ? ", data, callback);
    },

    updateData: (db, id, tanggal_masuk, jenis_sampah, berat_sampah, total_harga, callback) => {
        const sql = "UPDATE sampah_masuk SET tanggal_masuk = ?, jenis_sampah = ?, berat_sampah = ?, total_harga = ? WHERE id = ?";
        db.query(sql, [tanggal_masuk, jenis_sampah, berat_sampah, total_harga, id], callback);
    },
    
    deleteData: (db, id, callback)=> {
        db.query("DELETE FROM sampah_masuk WHERE id = " + id, callback)
    }
}