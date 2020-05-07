const jwt = require('jsonwebtoken');
const fs = require('fs');

securedProductos = (req,res,next) => {

  try {
    // Bearer | JWT 
    // JWT eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4NjgxNDA3LCJleHAiOjE1ODg2ODg2MDd9.sQu8727BVCiKIZA72HLknQ9KOChO-OID4n6w3z5IkWu5oKQgIUaT2ZcjPF-CeZ_Vq5VsuIyxoJmoePnozdP_AyjyajYfi4sibE-5LYnPF8Q4HFfISlu0GY1rLCxs86T1rRlEsmhcTRkWlSS0K8Vph5kMPKZXxkr-ElJS2QtAn8g
    // replace
    let token = req.headers.authorization; // token que envia el usuario
    console.log(`Cabeceras : ${token}`);
    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./claves/publica.pem');
    let decoded = jwt.verify(token,publicKey);
    let id = decoded.id;
    let role= decoded.role;
    console.log('estoy aca!!!');
     role == 1 ? next() : res.status(401).json({message : 'unauthorized'});
   // break // return
  } catch(error) {
    console.log(error);
    res.status(401).json({status : false, message : 'unauthorized'})
  }
}
  
module.exports = {securedProductos};