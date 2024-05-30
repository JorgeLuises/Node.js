//Importación de 'dotenv'
require('dotenv').config();

//Importación de librerias 'express' y 'mongoose'
const mongoose = require('mongoose');
const express = require('express');

//Configuración de la base de datos
const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env;
const dataBase = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/{DB_NAME}`;

//Creación del servidor y del middleware para los JSON
const server = express();
server.use(express.json());

//Creación de la colección de documentos para la bd
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
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    birthDate: {
        type: Date,
        required: false
    },
    generation: {
        type: Number,
        min: 1,
        max: 100
    }
});
const Student = mongoose.model('student', schema);

//Conexión a la base de datos y creación del end-point
mongoose.connect(dataBase)
.then(() => {
    console.log("Conexion a base de datos exitosa");
    //Creación del end-point
    server.post('/koders', (request, response) => {
        const {firstName, lastName, email, birthDate, generation} = request.body;

        Student.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthDate: birthDate,
            generation: generation
        })

        .then(() => { 
            console.log("Student added");
            response.json({
                message: "Student added"
            });
        })
        .catch((error) => {
            console.log("There is something wrong adding the student", error);
        });
    })
})
.catch((error) => {
    console.error("Error al conectar con la base de datos", error);
});

//Poner a escuchar servidor
server.listen(8080, () => {
    console.log("Server running succesfully");
});