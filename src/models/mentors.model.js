const mongoose = require('mongoose');

const modelName = 'Mentors';

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: false,
        minLength: 2,
        maxLength: 100
    },
    email: {
        type: String,
        required: false,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    birthDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model(modelName, schema);