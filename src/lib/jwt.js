//Archivo para la configuracion de un token
const jsonwebtoken = require('jsonwebtoken');

const {JWT_SECRET} = process.env; //Extraemos la palabra secreta del archivo .env

function sign (payload) {
    return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '1d' });// hacemos uso del metodo sign de la libreria jsonwebtoken para crear un token, ocupamos como atributos el payload, JWT_SECRET (que es la palabra secreta escrita en el archivo .env) y expiresIn (que es el tiempo que va a durar un token)
};

function verify (token) {
    return jsonwebtoken.verify(token, JWT_SECRET);//Usamos el metodo verify para comparar la llave del token y la palabra secreta del archivo .env
};

module.exports = {
    sign,
    verify
};