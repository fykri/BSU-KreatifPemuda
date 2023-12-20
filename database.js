const mysql = require('mysql')

const connection = mysql.createConnection({
    host:"localhost",
    database: "sampah",
    user: "root",
    password: ""
})

connection.connect((err)=> {
    if(err) {
        console.log("Koneksi Ke Database Error: ", err);
    } else {
        console.log("Koneksi Ke Database SUKSES");
    }
    return;
})

module.exports = connection;