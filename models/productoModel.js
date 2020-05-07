const pool = require('../db');

// Padre | Hijo

async function consultaProductos(){
    try {
        let query = "select * from producto";
        const rows = await pool.query(query);
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

async function deleteProdcuto(id) {
    try {
        
        let query = "delete from  producto where id  =  " + id ;
        const rows = await pool.query(query);
        return rows;  //2
    } catch(error) {
        throw error; // propaga el error
    }
}
async function updateProductoById(obj) {
    try {
        // Se usa object notation para el update a la tabla
        // Recordar que todos las propiedades del objeto deben coincidir con los campos de la tabla

        let query = `update producto set ? where id='${obj.id}' `;
        const rows = await pool.query(query, [obj]);
        console.log(rows);
        return rows.updateId; //2                <-------------------- Cantidad modificada?
    } catch (error) {
        throw error; // propaga el error
    }
}


// getUserByUsernameAndPassword is not a function 
module.exports = {createProducto,consultaProductos, deleteProdcuto,  updateProductoById}