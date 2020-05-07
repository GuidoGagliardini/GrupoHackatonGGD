const pool = require('../db');

// Padre | Hijo

async function getUserByUsernameAndPassword(user,password){
    try {
        let query = "select id,user,role from usuarios where user = ? and password = ?";
        const rows = await pool.query(query,[user,password]);
        return rows;
    } catch (error) {
        // start transaction | rollback   
        throw error; // pasar el error al padre
    }
}

// SOLID
async function createProducto(obj) {
    try {
        // Se usa object notation para el insert a la tabla
        // Recordar que todos las propiedades del objeto deben coincidir con los campos de la tabla
        let query = "insert into producto set ?";
        const rows = await pool.query(query,[obj]);
        return rows.insertId;  //2
    } catch(error) {
        throw error; // propaga el error
    }
}

// getUserByUsernameAndPassword is not a function 
module.exports = {createProducto,getUserByUsernameAndPassword}