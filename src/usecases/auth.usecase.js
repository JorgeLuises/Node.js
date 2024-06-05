//Archivo de creación de un token pididendo el email y el password
const jwt = require('../lib/jwt');
const createError = require('http-errors');
const encrypt = require('../lib/encript');
const Koders = require('../models/koders.model');

async function login (email, password) {
    const koder = await Koders.findOne({ email: email });

    if (!koder) throw createError(401, 'Invalid data');

    const isPasswordValid = await encrypt.compare(password, koder.password);

    if (!isPasswordValid) throw createError(401, 'Invalid data');

    const token = jwt.sign({ id: koder._id });

    return token;
};

module.exports = {login};