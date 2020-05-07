var express = require('express');
var router = express.Router();
const productoModel = require('../models/productoModel');
const sha1 = require('sha1');
/* GET users listing. */
// interactua
router.post('/alta', async (req,res,next)=> {
  try {
      let object = {
        nombre : req.body.nombre ,
        descripcion: req.body.descripcion,
        stock : req.body.stock,
      }
      // req.body.password = sha1(req.body.password)
      // req.body.role = 2;
      console.log(req.body);
      let result = await productoModel.createProducto(object)
      // validación por correo
      res.json({status : true, message : 'producto cargado correctamente'})
  } catch(error) {
    console.log(error);
    // la tabla user no existe.
    res.status(500).json({status : false, message : error})
  }
})

module.exports = router;
