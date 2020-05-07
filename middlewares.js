const jwt = require('jsonwebtoken');
const fs = require('fs');

securedProductos = (req,res,next) => {
    try {
      console.log("Entra al mw securedAdmin")
      let token = req.headers.authorization;
      console.log(token) 
      token = token.replace('Bearer ','');
      const publicKey = fs.readFileSync('./keys/public.pem');
      let decoded = jwt.verify(token, publicKey);
      console.log(`Decoded :`);
      console.log(decoded)
      req.id = decoded.id;
      req.id_permiso = decoded.id_permiso;
  
      req.id_permiso == 1 ? next() : res.status(401).json({message : 'unauthorized'})
    } catch (error) {
      res.status(401).json({message: 'unauthorized'});
    }
}
  
module.exports = {securedProductos};