/** Creación de los comandos para una tarea
 *  - que contenga un flag o bandera-- que es la descripción
 *  - un flag que es completado / booleano
 *  - help de ayuda al usuario
 */
// 1. Creación de constantes para los flags de la tarea
const descripcion = {

    // obligatorio
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {

    defauult: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente de la tarea'
}

// 2. Creación de la variable para la tarea
// command(nombre de la tarea, descripción de la tarea, objeto lo que contendra la tarea)
const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', {

        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {

        descripcion,
        completado
    })
    .command('borrar', 'Borrar una tarea', {

        descripcion
    })
    .help()
    .argv;

// 3. Exportamos nuestro Yargs a la carpeta app.js para poder ejecutar los comandos

module.exports = {
    argv
}
