//Archivo de creacion de middleware para la autorización de peticiones a un usuario
const createError = require('http-errors');
const jwt = require('../lib/jwt');
const kodersUsecase = require('../usecases/koders.usecase');

async function auth (request, response, next) {
    try {
        const token = request.headers.authorization;//Extraemos el token del usuario

        if (!token) throw createError(401, 'JWT is required');

        const payload = jwt.verify(token);//Ejecutamos la funcion de verificación del token, para poder obtener el paidload del token (que es el id que se crea en automatico en la base de datos)

        const user = await kodersUsecase.getById(payload.id);//Extraer el usuario que tiene la autorización de las peticiones.

        request.user = user;// Dar la autorización al usuario

        next ();
    } catch (error) {
        response.status(401);

        response.json({
            success: false,
            error: error.message
        });
    }
};

module.exports = auth;