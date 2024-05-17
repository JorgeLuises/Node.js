const fs = require("fs"); 
const dbKoders = "db.json";

//Sección del archivo
function initFile () {
    const fileExist = fs.existsSync(dbKoders);

    if (!fileExist) {
        fs.writeFileSync(dbKoders, JSON.stringify({ koders: []}));
    }
}

function getData () {
    const data = fs.readFileSync(dbKoders, "utf8");
    return JSON.parse(data).koders;
}

function updateData (data) {
    const newData = {koders: data};
    const newDataString = JSON.stringify(newData);
    fs.writeFileSync(dbKoders, newDataString);
}

//Sección de los comandos a utilizar
function ls () {
    const data = getData();

    if (!data.length) {
        console.log("Lista de koders vacia");
        process.exit(0);
    }
    data.forEach((koder, index) => {
        console.log(index, "--", koder);
    })
}

function add (koder) {
    const data = getData();
    data.push(koder);
    updateData(data);
}

function reset () {
    const data = [];
    updateData(data);
}

function rm (koderIndex) {
    const data = getData();
    data.splice(koderIndex, 1);
    updateData(data);
}

//Sección de ejecución del script
function main () {
    initFile ();

    const command = process.argv[2];
    const arg = process.argv[3];
    
    switch(command) {
        case "ls":
            ls ();
            break;

        case "add":
            if (!arg) {
                console.error("No agregaste ningun koder");
                process.exit(1);
            }
            add(arg);
            console.log("Koder agregado");
            ls();
            break;

        case "reset":
            reset();
            ls();
            break;

        case "rm":
            if (!arg) {
                console.error("No agregaste ninguna posición del koder que quieres eliminar");
                process.exit(1);
            }

            const indx = parseInt(arg);
            const koders = getData();

            if (isNaN(indx)){
                console.error("Esa posición del Koder no existe")
                process.exit(1);
            }

            if (indx < 0 || indx >= koders.length) {
                console.error("Número de posición invalido");
                process.exit(1);
            }

            rm(indx);
            console.log("Koder eliminado");
            ls();
            break;
        
        default:
            console.error(`El comando ${command} es invalido, intenta ingresar otro comando`);
            process.exit(1);        
    }
}

main ();