//Creación de servidor
const express = require('express');

const kodersRouter = require('./routes/koders.router');

const app = express();

app.use(express.json());

app.use('/koders', kodersRouter);

app.get('/', (require, response) => {
    response.json({
        message: "Koders APIv1"
    });
});

module.exports = app;