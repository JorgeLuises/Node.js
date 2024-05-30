//importar dotenv
require('dotenv').config(); //Libreria que nos permite guardar nuestras credenciales y accesos (datos inportantes o snesibles del programa en un archivo ".env")

//importar mongoose
const mongoose = require("mongoose");

const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env; //Extraer variables del archivo .env
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

//modelo de datos (cuando se llama un modelo, el modelo empieza con mayusculas), el modelo lleva un nombre y con el comando "new.Schema" le indicas que tipo de archivos va a tener la colección koder (en este ejemplo)
const Koder = mongoose.model('koder', new mongoose.Schema({
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
}));

//conectamos el js con la base de datos por medio de una URL
//protocolo://usuario:password@host/dbName
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Conexion exitosa");
    // Insertar nuevo modelo en la colección
    Koder.create({
        firstName: "Jorge",
        lastName: "Solana",
        email: "jorge.luis@outlook.com",
        birthDate: new Date("1997-05-01"),
        generation: 33
    })
    .then(() => { console.log('Koder created')})
    .catch((error) => { console.log('Error al crear koder', error)});
})
.catch((error) => {
    console.error("Error al conectar con la base de datos", error);
});

/* 
    Las promesas nacen o se crean en estado - pendiente
    pudenen tener los estados:
    -resolve: se resuelve la promesa (.then())
    -rejected: se rechaza la promesa (.catch())
*/