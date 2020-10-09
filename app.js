/** Acá importaremos el Yargs y Colors */

// 1. Importación del Yargs de la carpeta configuraciones/yargs.js
const argv = require('./configuracion/yargs').argv;
// Importamos Colors para visualizar los colores en la consola
const colors = require('colors');
// importamos nuestra tarea por-hacer.js
const porHacer = require('./realizar/por-hacer');

// 2. Estos son los comandos que va contener nuestro yargs a la hora de ejecutar nuestro proyecto
//    son una ayuda al usuario al ejecutar los comandos

// variable que contendra todas las tareas
let comandoTareas = argv._[0];
// switch para escoger el tipo de variable 
switch(comandoTareas){

    case 'crear':
        // llammamos a nuestra variable "crear" desde por-hacer.js a traves de la variable tarea
        let tareaCrear = porHacer.crear(argv.descripcion);
        console.log(tareaCrear); 
    break;

    case 'leer':
        // llammamos a nuestra variable "leer" desde por-hacer.js a traves de la variable tarea
        let tareaLeer = porHacer.leer(argv.descripcion);
        console.log(tareaLeer);
    break;

    case 'listar':
        let listarTarea = porHacer.obtenerListado();

        // Agregamos ciclo for para ejecutar cada tarea del archivo Json y visualizarlo en la consola
        for(let tarea of listarTarea){
            console.log('********** Por Hacer **********'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('********************************'.green);
        }

    break;

    case 'actualizar':
        // variable para actualizar las tareas, los parametors vienen del Yargs.js
        let tareaActualizar = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(tareaActualizar);
    break;

    case 'borrar':
        // variable para borrar las tareas, los parametors vienen del Yargs.js
        let tareaBorrar = porHacer.borrar(argv.descripcion);
        console.log(tareaBorrar);
    break;

    default:
        console.log('Comando no reconocido');
}
/** Para probar los comandos colocamos en el cmd: node app "Nombre de la lista del switch"
 *  ejemplo: node app crear
 */
