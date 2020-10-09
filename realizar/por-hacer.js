/**Contendra la lógica donde vamos a guardar cada tarea que registremos desde el CMD y que configuramos
 * en el Yargs
 */

// 1. variable es donde vamos a grabar el contenido FyleSystem(fs)
const archivoSistema = require('fs');

// 2. Todas las notas van hacer registradas en un arreglo, lo dejamos vacío 
let listadoTareas = [];

// 3. Funciones, seran las tareas o los pasos que va a realizar nuestros yargs el cual sera la descripción
//    que agreguemos desde el cmd

// ******************************* Lógica del funcionamiento de las tareas ************************************

// 3.1 Función guardarTarea
const guardarTarea = () => {

    // data donde voy a grabar la tarea en formato JSON (conversión objeto(arreglo) a JSON)
    let data = JSON.stringify(listadoTareas);

    // almacenamiento de la data en el fylseSystem o archivoSistema
    // writeFile('#ruta del archivo a grabar', contenido que voy a grabar, callback)
    archivoSistema.writeFile('base-de-datos/tareas.json', data, (err) => {

        // En caso de que halla un error
        if (err) throw new Error('Error al grabar! intente de nuevo', err);
    });
}

// 3.2 Leer la información del formato JSON proceso inverso de guardarTarea
const cargarTarea = () => {

    //leer un archivo JSON, realizaremos un require del archivo JSON y lo serializa para convertir
    // un objeto de Javascript

    // Agregamos un try-catch en caso de que el archivo Json se encuentre vacío
    try {

        listadoTareas = require('../base-de-datos/tareas.json');

    } catch (error) {

        listadoTareas = [];
    }

    // Visualización por consola
    //console.log(listadoTareas);
}

// 3.3 Función obtenerListado
const obtenerListado = () => {

    // Obtenemos el listado de nuestro archivo JSON a través de la función
    cargarTarea();

    // retorna nuestra lista de tareas del arreglo
    return listadoTareas;
}

// ***************************************** Función del CRUD ************************************************
// 3.4  Función Crear
const crear = (descripcion) => {

    // Antes de crear hay que cargar que información tendra la base de datos
    cargarTarea();

    // Acción de la tarea crear
    let porHacer = {
        descripcion,
        completado: false
    };

    // Es donde ejecutamos nuestra tarea, un push para que se guarden en el arreglo listadoTareas
    listadoTareas.push(porHacer);

    // Ejecución de grabar la tarea en el archivo JSON
    guardarTarea();

    // retorna
    return porHacer;
}

// 3.5 Función Leer 
const leer = (descripcion) => {

    // Agregamos nuestra función cargarTarea para poder ver el contenido en consola
    cargarTarea();
}

// 3.6 Función Actualizar 
const actualizar = (descripcion, completado = true) => {

    // cargar la lista de tareas
    cargarTarea();



    // creación de variable que coincida con la descripcción de la tarea del arreglo ListarTarea
    // index es la posición de los arreglos
    let index = listadoTareas.findIndex(tarea => {
        // Coomparación para verificar que la tarea coincide con la descripción de la tarea registrada
        // en el archivo tareas.json

        // retorna la descripción
        return tarea.descripcion === descripcion;
    });

    // Condicional para determinar la posición del arreglo de ListarTarea en el que determinamos
    // el estado del completado
    if (index >= 0) {

        // toma el completado de lo que la persona digite desde el cmd
        listadoTareas[index].completado = completado;

        // grabar lo que el suaurio digite y así actualizar
        guardarTarea();

        // enviar un true de que la tarea se registro correctamente
        return true;

    } else {

        // retorna falso en caso de no lograr actualizar la tarea
        return false;
    }

}

// 3.7 Función Borrar
const borrar = (descripcion) => {

    // Traer el listado de tareas registrado en tareas.json
    cargarTarea();

    // Utilizaremos filter que es propio de los arreglos para borrar la tarea
    // se filtrara a través de la descripción
    let nuevaTarea = listadoTareas.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    // Condicional para saber si se borro los arreglos
    if (listadoTareas.length === nuevaTarea.length) {

        // retorna falso, es decir no lo borro
        return false

    } else {

        // Si lo borró trae el arreglo
        listadoTareas = nuevaTarea;
        // guarda los nuevos cambios en guardarTarea
        guardarTarea();
        // devuelve al usuario un true
        return true
    }
}


/** Nota, como queremos que se mantenga los datos del archivo o de la descripción que coloquemos en consola
 * crearemos una carpeta llamada base-de-datos y ahí alojaremos toda la información en el formato JSON
 * llamado tareas.json
 */

// 4. Modulo de exportar para nuestro app.js y lograr grabar las tareas que registremos en el CMD
module.exports = {
    crear,
    leer,
    obtenerListado,
    actualizar,
    borrar
}



