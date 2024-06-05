const mongoose = require('mongoose');

const modelName = 'Koders';

const schema = new mongoose.Schema({
    firstName: { //Reglas de mi atributo
        type: String,
        required: true,//Indicar que este campo es requerido
        minLength: 2,
        maxLength: 100 //Condición del tamaño del campo
    },
    lastName: {
        type: String,
        required: false,
        maxLength: 100

    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, //Línea que ocupa una rejex para comparar los caracteres de un correo electronico
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: false
    },
    generation: {//Creación de relacion de generación de un koder, con el modelo Generations
        type: mongoose.Schema.Types.ObjectId,
        ref: "generations"    
    },
    createdAt: { //Creacion del documento, se llena en automatico
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(modelName, schema);