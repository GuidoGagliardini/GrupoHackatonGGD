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
});
router.delete('/', async (req,res,next)=> {
  try {

     
      let result = await productoModel.deleteProdcuto(req.body.id)
      // validación por correo
      res.json({status : true, message : 'producto eliminado correctamente'});
  } catch(error) {
    console.log(error);
    // la tabla user no existe.
    res.status(500).json({status : false, message : error})
  }
});
router.get('/', async (req,res,next)=>{
  try{
    let result =  await  productoModel.consultaProductos();
    res.json({status: true , data: result});


  }

  catch{
    res.json({status:false , message:"MAL!"})
  }

});
router.put('/update', async (req,res,next)=>{
  try{
    let object = {
      id: req.body.id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      stock: req.body.stock,
      estado: req.body.estado,
      foto: req.body.foto
  }
  console.log (req.body);
  console.log(`${object.id}`); s
  if (`${object.id}`== req.body.id){

    let result =  await  productoModel.updateProductoById(object);
    console.log("aca esta result--->" + result);
    res.json({status: true , message: 'actualizado correctamente '});
  }else {
    res.json({status:true ,  message :'el ID no existe'});
  }


  }

  catch{
    res.json({status:false , message:"MAL!"})
  }

})

module.exports = router;
