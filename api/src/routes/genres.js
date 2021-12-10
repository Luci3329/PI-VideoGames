require ('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default;
const { RAWG_API_KEY } = process.env; 
const { Genre } = require('../db');


const router = Router();

router.get('/', async (req, res) =>{ // /genres -> botón con opciones en el front
    try{
        // me trigo todos los géneros de la API y los guardo en mi DB tabla Genre
        const genreAPI = await axios.get(`https://api.rawg.io/api/genres?key=${RAWG_API_KEY}`);
        genreAPI.data.results.forEach(g => { // x cada género de la api creo uno en bd
            Genre.findOrCreate({ // primero busca si ya existe... si no existe la crea -> tengo el servidor en { force: false }
                where : { name : g.name }
            })
        });

        const genresDB = await Genre.findAll({ // para la búsqueda por NOMBRE -> botón del front
            attributes : [ "name" ]
            }
        );

        

        //console.log('el pájaro está en la jaula')
        res.json(genresDB); // json me trae objetos -> VER


    } catch(err){
        res.sendStatus(404) // .json({err : 'Gender Not Found!'}) va a ser un bótón, no tengo q responder nada
    }

}) 

module.exports = router;

// https://api.rawg.io/api/genres?key=70b6a3709e064e62b968f237389e388d