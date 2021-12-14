const { Router } = require('express');
//const axios = require('axios').default;
//require('dotenv').config();
//const { RAWG_API_KEY } = process.env;
//const { Videogame, Genre } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogames = require('./videogames');
const videogame = require('./videogame');
//const genres = require('./genres');
const NewGame = require('./newGame'); 
const info = require('./info');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/videogames', videogames); // home y búsqueda de un juego x query
router.use('/videogame', videogame); // search x id
router.use('/videogame', NewGame);  // POST recibo info del front x body
// creo nuevo videojuego EN LA BASE DE DATOS  
 
 
router.use('/info', info) ; // a ésta me la cree al final -> para tener una ruta q me traiga 
// el listado de todos los géneros y todas las plataformas q necesito para 
//                                  los select del front

module.exports = router;
