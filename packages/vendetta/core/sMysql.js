const mysql = require('mysql');
const util = require ('util');
const bcrypt = require('bcrypt');

let DB = false;
DB = mysql.createConnection({host: "localhost", user: "root", password: "", database: "vendetta"});
DB.connect(function(err){
    if (err) return console.error("[MYSQL] Ошибка: " + err.message);
    else console.log("[MYSQL] Successful connection");
});

module.exports.DB = DB
module.exports.query = async(q, params) => {
    const rows = await util.promisify(DB.query).bind(DB)(q, params)
    return Object.assign({}, rows)
}