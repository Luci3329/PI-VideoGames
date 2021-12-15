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
    // primero me traigo los de la base de datos y los guardo (junto con los géneros concatenados) en un arr

    let gamesDb = await Videogame.findAll({
        include: Genre
    });

    //Parseo el objeto -> no estoy segura para q ...
    gamesDb = JSON.stringify(gamesDb);
    gamesDb = JSON.parse(gamesDb);

    //Aca dejo el arreglo de generos plano con solo los nombres de cada genero(llega array de objetos)
    /* gamesDb = gamesDb.reduce((acc, el) => acc.concat({
        ...el,
        genres: el.genres.map(g => g.name)
    }), []) */


    // búsqueda por query  ***************


    if (req.query.name) {
        try {
            //busco si existe el juego en la API
            let info = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${RAWG_API_KEY}`);
            if (!info.data.count) return res.status(204).json(`Juego no encontrado "${req.query.name}"`);

            //filtro -> ruta principal -> nombre, imagen, género
            const infoApi = info.data.results.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(g => g.name)
                }
            });

            //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
            const gamesDbSearch = gamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            //doy prioridad a la DB, y sumo todos, y corto el array en 15
            const results = [...gamesDbSearch, ...infoApi.splice(0, 15)];
            // xq el readme me pide traer las 1ras 15 coincidencias

            return res.json(results) // arreglo con coincidencias tanto de la db como de la api

        } catch (err) {
            next(err)
        }

    } else { // si no viene búsqueda por query -> muestro los 100 en el inicio

        /*    const inicio = await getApiInfo();
           res.status(200).send(inicio);
       } */

        try {
            let pages = 0;
            var results = [...gamesDb]; //sumo lo que tengo en la DB
            var response = await axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`);
            while (pages < 6) {
                pages++;
                //filtro solo la DATA que necesito enviar al FRONT
                const seleccion = response.data.results.map(game => {
                    return {
                        id: game.id,
                        name: game.name,
                        background_image: game.background_image,
                        rating: game.rating,
                        genres: game.genres.map(g => g.name)
                    }
                });
                results = [...results, ...seleccion] // base de datos + api
                response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
                                                              // xq no puedo usar la propiedad page                      
            }
            return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
});


module.exports = router;



