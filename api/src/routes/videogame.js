require('dotenv').config();
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const { Router } = require('express');
const axios = require('axios').default;
const { RAWG_API_KEY } = process.env;
const { Videogame, Genre } = require('../db');




const router = Router();

// ésta ruta tiene q mostrar EL DETALLE del videojuego q llega por params
// la idea era usar las funciones q hice para el /videogames agregando los datos q faltaban
// peeeero... data.results no trae las descripciones, asíq no funcionó


router.get('/:id', async (req, res) => { // ruta '/videogame'


  try {

    const { id } = req.params;


    if (uuidValidate(id)) { // para ver si el id coincide con alguno de la db
      
      const getIdDb = await Videogame.findByPk(id, { // devuelve objeto dataValues
        include: Genre
      });

      res.status(200).json({ data: getIdDb.dataValues })

    } else { // si no coincide con alguno de la db --> lo busco en la api


      const gAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`);
          // devuelve objeto data

      let { id : game_id, name, description, released, rating, platforms, background_image, genres } = gAPI.data;
      // tuve q renombrar el id xq interfería en el macheo del id params... no estoy segura de xq

      platforms = platforms.map(p => p.platform.name); // [ {platform: { ... }}, {platform : { ... } } ]
      genres = genres.map((p) => p.name); // [ {genre} {genre} {genre} ]

      return res.status(200).json({ // probé 2 millones de cosas - no puedo mapear xq data es un objeto
        game_id,              // probé guandando todo ésto en una variable --> name : gAPI.data.name (etc)
        name,                 // y nada. Sólo funcionó destructurando.
        description,
        released,
        rating,
        platforms,
        background_image,
        genres
      })

    }
  } catch (err) {
    res.status(404).json({ err: 'Videogame Not Found!' });
  }

});


module.exports = router;