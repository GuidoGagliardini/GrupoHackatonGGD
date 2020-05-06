// protegida
const express = require('express');
const router = express.Router();

router.get('/user', async(req,res,next)=> {
    try {
        res.json({status : true, message : 'usuario autenticado'})
    } catch(error) {
        res.status(500).json({status : false})
    }
})

module.exports = router;