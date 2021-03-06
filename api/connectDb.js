var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function connectdb() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

module.exports = {
    connectdb: connectdb,
    con: con,
}
