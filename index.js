import express from 'express';
//const express = require('express');

import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const app = express();

//Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));



// habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear(); // Esta variable es visible en el proyecto
    res.locals.nombresitio = "Agencia de Viajes";
    next(); // pasa al siguiente middleware
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar Router
app.use('/', router);


// Puerto y host para la app 
//Definir host
const host = process.env.HOST || '0,0,0,0';
// Definir puerto
const port = process.env.PORT || 4000; // Variables de entorno

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port} y en el host ${host}`)
})