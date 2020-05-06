var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');
const sha1 = require('sha1')
/* GET users listing. */
// interactua
router.post('/new', async (req,res,next)=> {
  try {
      let object = {
        user : req.body.user,
        password : sha1(req.body.password),
        role : 2 // es un usuario común
      }
      // req.body.password = sha1(req.body.password)
      // req.body.role = 2;
      console.log(req.body);
      let result = await userModel.createUser(object)
      // validación por correo
      res.json({status : true, message : 'Usuario registrado correctamente'})
  } catch(error) {
    console.log(error);
    // la tabla user no existe.
    res.status(500).json({status : false, message : error})
  }
})

module.exports = router;
