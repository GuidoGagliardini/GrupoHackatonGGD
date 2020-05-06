// singleton

const mysql = require('mysql');
const util = require('util')
// util elimina callback hell

// como máximo esto acepta 10 conexiones en // COLAS : FIFO (First input first output)
let pool = mysql.createPool({
    connectionLimit : 10,
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DB
})
// CONVERTIR el objeto pool en una peticion sincronica
pool.query = util.promisify(pool.query);
module.exports = pool; // exportamos la referencia de la conexion
