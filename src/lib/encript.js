//Archivo para la implementacion de encriptación de contraseñas
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;//Indicamos el numero de caracteres que se le va agregar al password del usuario para poder encriptarlo

function encrypt (text) {
    return bcrypt.hash(text, SALT_ROUNDS);//Hash es un metodo que ocupa la contraseña y el SALT_ROUNDS para poder encriptar la contraseña del usuario
};

function compare (plainText, hash) {
    return bcrypt.compare(plainText, hash);//compare es un metodo que hace la comparación de la contraseña del usuario y el encriptado para ver si son la misma contraseña
};

module.exports = {
    encrypt,
    compare
};