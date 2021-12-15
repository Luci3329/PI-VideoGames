require('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default;
const { RAWG_API_KEY } = process.env;
const { Videogame, Genre } = require('../db');


const router = Router();



const getApiInfo = async () => {   // función q me trae sólo 100 juegos

    var games = (num) => {   // num = 100
        const n = num / 20  // cantidad de páginas (5)

        let total = []

        for (let i = 1; i <= n; i++) {

            let game = axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${i}`)
            total = [...total, game]
        }
        return total
    }  // hago 5 llamados a axios -> 5 promesas -> 1 x c/página -> 20 x c/u

    let total = await Promise.all(games(100))   // [  [20] [20] [20] [20] [20]  ]


    let todos = [];
    total = total.map(e => e.data.results.map(los20 => todos.push(los20))) // 20 + 20 + 20 + 20 + 20


    let los100 = todos.map((game => {
        return { // me traigo sólo los datos requeridos en página principal
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map(gr => gr.name), //[ para q traiga sólo el nombre del género ]
            platforms: game.platforms.map((platform) => platform.platform.name) // [ {} {} {} ]
        }// game.genres trae un arreglo de obj de c/ género del juego, pero con id, nombre, imagen y 2 huevadas más
        // g.platforms.map((platform) => platform.platform.name)
        // .map( p=> p.platform.name)
    }))


    return los100;

};




router.get('/', async (req, res, next) => {
    // en ésta ruta tenemos q poder buscar un juego x query y traernos todos los juegos 

    const { game } = req.query;


    if (game) {  // si me llega name por query

        // voy a filtrar del arreglo con TODOS los juegos, el q coincida con el name de la query

        try { // primero lo busco en la base de datos


            const gameInDb = await Videogame.findAll(
                { where : { name : { [Op.iLike]: `%${game}` }}},
                { include: [ Genre ]} );


            const dataDb = 
            gameInDb && gameInDb.map( (g) => ({
                name : g.dataValues.name,
                image : g.dataValues.image,
                genres : g.dataValues.genres

            }))    
                
             /*   attributes: ['name', 'background_image'], // sólo me traigo los datos de la RUTA PRINCIPAL
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                } 
            }) */

            console.log(gameInDb);

            if (gameInDb.length) { // si lo tengo lo devuelvo
                res.status(200).json( { data : gameInDb})
            }

            else { // sino, lo voy a buscar entre los 350mil de la api


                const info = await axios.get(`https://api.rawg.io/api/games?search=${game}&key=${RAWG_API_KEY}`);

                let { name, background_image, genres } = info.data.results;
                // tuve q renombrar el id xq interfería en el macheo del id params... no estoy segura de xq

                //description = description.replace(/(<([^>]+)>)/gi, ""); // para q no se rendericen los <tag>, en el front me da error  
                //platforms = platforms.map(p => p.platform.name).map(p => p + ' - '); // [ {platform: { ... }}, {platform : { ... } } ]
                genres = genres.map((g) => g.name).map(g => g + ' - '); // [ {genre} {genre} {genre} ]

                return res.status(200).json({ // probé 2 millones de cosas - no puedo mapear xq data es un objeto
                                 // probé guandando todo ésto en una variable --> name : gAPI.data.name (etc)
                    name,                 // y nada. Sólo funcionó destructurando.
                    //description,
                    //released,
                    background_image,
                    //rating,
                    //platforms,
                    genres
                });

               /*  console.log(infoApi);

                infoApi ?
                res.status(200).json({data : infoApi}) :
                res.status(200).json({ msj : "no exite el juego? O hay algún error"}) */


            }

        } catch (err) {
            next(err);
        }


    } else { // si no viene búsqueda por query -> muestro los 100 en el inicio

        const inicio = await getApiInfo();
        res.status(200).send(inicio);
    }
})


module.exports = router;