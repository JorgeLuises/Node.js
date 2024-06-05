const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    program : {
        type: String,
        required: true,
        enum: [
            'javascript',
            'python',
            'ios',
            'android'
        ]//Linea para limitar al ususario, los valores que puede meter en el campo
    },
    starDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('generations', schema);