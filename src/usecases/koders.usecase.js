const createError = require('http-errors');
const encrypt = require('../lib/encript');
const Koders = require('../models/koders.model');

async function create (koderData) {
    const koderFound = await Koders.findOne({ email: koderData.email }); //Agregamos filtro con "{}"

    /*Sintaxis para ocupar filtro con una condición
      ({ $OR [{}, {}]});
    */

    if (koderFound) throw createError(409, 'Email already in use');

    koderData.password = await encrypt.encrypt(koderData.password);// Encriptacion de password y asignación del valor de password

    const newKoder = await Koders.create(koderData);
    return newKoder;
};

async function getAll () {
    const allKoders = await Koders.find();
    return allKoders;
};

async function getById (id) {
    const koder = await Koders.findById(id);
    return koder;
};

async function deleteById (id) {
    const koderDeleted = await Koders.findByIdAndDelete(id);
    return koderDeleted;
};

async function updateById (id, newKoderData) {
    const koderUpdated = await Koders.findByIdAndUpdate(id, newKoderData, { new: true} /*regresa el koder actualizado*/);
    return koderUpdated;
};

module.exports = {
    create,
    getAll,
    getById,
    deleteById,
    updateById
};