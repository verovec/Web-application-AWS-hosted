var fs = require('fs');
content = fs.readFileSync('./data_set/creneau.json');
var data = JSON.parse(content);

var mysql = require('mysql2/promise');

(async () => {
    const con = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    call(con);
})();

async function call(con) {
    await main(con);
    closeMysqlConnection(con);
}

function insertData(con, horaire){
    return con.query('INSERT INTO creneau (horaire) VALUES ("' + horaire + '")')
}

async function main(con) {
    const promises = data.map(item => insertData(con, item));
    return Promise.all(promises);
}

function closeMysqlConnection(con) {
    con.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
    con.destroy();
}
