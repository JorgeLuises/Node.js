const prompt = require("prompt-sync")();

let nameArray = [];

console.log ("Programa para ingresar nombres en una lista");

while (true) {
    let nombre = prompt("Ingresa nombre: ");
    nameArray.push(nombre);
    let respuesta = prompt("Haz agregado un nombre ¿Deseas agregar otro? (si/no): ");
    if (respuesta.toLocaleLowerCase() !== "si") {
        break;
    }
}

//Dato del numero de nombres ingresados
console.log(`Ingresaste ${nameArray.length} nombre(s)`);

//Dato de los nombres repetidos
const nombresRepetidos = nameArray.filter((nombre,index) => nameArray.indexOf(nombre) != index);
if (nombresRepetidos.length > 0) {
    console.log("Los nombres repetidos de la lista son: ", nombresRepetidos);
}
else {
    console.log("No hay nombres repetidos en la lista");
}

//Dato del nombre mas largo
let nombreLargo = nameArray[0];
nameArray.forEach((name) => {
    if (name.length > nombreLargo.length) {
        nombreLargo = name;
        console.log(`El nombre mas largo es: ${name}`);
    }
});

//Dato del nombre mas corto
let nombreCorto = nameArray[0];
nameArray.forEach((name) => {
    if (name.length < nombreCorto.length) {
        nombreCorto = name; 
        console.log(`El nombre mas corto es: ${name}`);
    }
});