//Importar los modulos
const express = require('express');
const fs = require('fs');

//Enlaces del servidor y de la base de datos
const server = express();
const dataBase = "db.json";

//Linea de comando para que el servidor reciba información en JSON
server.use(express.json());

//Funcion para inicializar la base de datos
function initFile () {
    const fileExist = fs.existsSync(dataBase);

    if (!fileExist) {
        fs.writeFileSync(dataBase, JSON.stringify({koders: []}));
    }

}

//Obtener la base de datos
function getData () {
    const data = fs.readFileSync(dataBase, "utf8");
    return JSON.parse(data).koders;
}

//Actualizar base de datos
function updateData (data) {
    const newData = {koders: data};
    const newDataString = JSON.stringify(newData);
    fs.writeFileSync(dataBase, newDataString);
}

//Seccion de peticiones y respuestas
function main () {

    initFile ();

    //Traer la base de datos
    server.get('/koders', (request, response) => {
        
        const data = getData();

        response.json({
            message: "All koders so far",
            koders : data
        });
    });

    //Agregar un nuevo koder
    server.post('/koders', (request, response) => {

        const data = getData();
        
        const newKoderName = request.body.name;
        const newKoderGeneration = request.body.generation;
        const newKoderGender = request.body.gender;
        const newKoderAge = request.body.age;
        const newKoderActive = request.body.isActive;

        if (!newKoderName || !newKoderGeneration || !newKoderGender || !newKoderAge || !newKoderActive) {
            response.status(400);
            response.json({
                message: "Make sure you add all fields"
            });
            return;
        }

        if (isNaN(newKoderAge) || isNaN(newKoderGeneration)) {
            response.status(400);
            response.json({
                message: "Make sure age or generation is a number"
            });
            return;
        }

        const newKoder = {
            name: newKoderName,
            generation: newKoderGeneration,
            gender: newKoderGender,
            age: newKoderAge,
            isActive: newKoderActive
        };

        data.push(newKoder);

        updateData(data)
        
        response.json({
            message: "New koder added",
            koders: data
        });
    });

    //Eliminar koder por nombre
    server.delete('/koders/:name', (request, response) => {
        const koderDelete = request.params.name;
        const data = getData();

        if (!koderDelete) {
            response.status(400);
            response.json({
                message: "Invalid action, the name must be in the list"
            });
            return;
        }
        
        const newData = data.filter((koder) => koder.name !== koderDelete);
        updateData(newData);

        response.json({
            message: "Koder was deleted",
            koders: newData
        });
    });

    //Eliminar toda la bd
    server.delete('/koders', (request, response) => {
        
        updateData([]);

        response.json({
            message: "Data base deleted",
            koders: []
        });
    });

    //Escucha el servidor
    server.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
};

main();