const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const sha1 = require('sha1')

const jwt = require('jsonwebtoken'); // libreria instalada
const fs = require('fs'); // libreria propia del core de node


router.post('/', async (req,res,next)=> {
    try {
        let user = req.body.user;
        let password = req.body.password;
        console.log(req.body);
        let result = await userModel.getUserByUsernameAndPassword(user,sha1(password));
        // verificar la longitud del array respuesta
        // result.length > 0 ? res.json({status : true, data : result}) : res.json({status : true, message : 'Datos incorrectos'})
       
        
        // https://www.npmjs.com/
        if(result.length > 0) {
            let payload = {}; // defino el objeto payload -> encargado de transportar los datos 
            // no va a continuar con el flujo del programa hasta que el archivo sea leido correctamente
            const privateKey = fs.readFileSync('./claves/privada.pem','utf-8');

            // string con la información del file
            // Aritmetica modular (Criptosumas)
            let signOptions = {
                expiresIn : '2h',
                algorithm : "RS256"
            }
            if(result[0].role == 1) {
                // usuario administrador
                payload = {id : result[0].id, role : 'admin'}
            } else {
                // Usuario común
                payload = {id : result[0].id, role : 'user'}
            }

            // JWT -> PAYLOAD, CLAVE, SIGNOPTIONS
            const token = jwt.sign(payload,privateKey,signOptions);
            res.json({status : true, JWT : token})

        } else {
            res.status(401).json({status : true, message : 'unauthorized', JWT : null})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({status : false})
    }

})

module.exports = router;
