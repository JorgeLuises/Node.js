//Creación de servidor
const express = require('express');

const kodersRouter = require('./routes/koders.router');
const mentorsRouter = require('./routes/mentors.router');
const authRouter = require('./routes/auth.router');

const app = express();

app.use(express.json());

app.use('/koders', kodersRouter);
app.use('/mentors', mentorsRouter);
app.use('/auth', authRouter);

app.get('/', (require, response) => {
    response.json({
        message: "Koders APIv1"
    });
});

module.exports = app;