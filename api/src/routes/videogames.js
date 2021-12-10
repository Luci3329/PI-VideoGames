require('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default;
const { RAWG_API_KEY } = process.env;
const { Videogame, Genre } = require('../db');


const router = Router();


const getDbInfo = async () => {
    return await Videogame.findAll({
        attributes: ['name', 'background_image', 'rating', 'platforms', 'createdInDB'], // sólo me traigo los datos de la RUTA PRINCIPAL
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}



const getApiInfo = async () => {

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
            id : game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map(gr => gr.name), //[ para q traiga sólo el nombre del género ]
            platforms : game.platforms.map((platform) => platform.platform.name) // [ {} {} {} ]
        }// game.genres trae un arreglo de obj de c/ género del juego, pero con id, nombre, imagen y 2 huevadas más
           // g.platforms.map((platform) => platform.platform.name)
           // .map( p=> p.platform.name)
    }))


    return los100;

};



const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    //gAPI = await axios.get(gAPI.data.next)
    return allInfo;
}



router.get('/', async (req, res) => {
    // en ésta ruta tenemos q poder buscar un juego x query y traernos todos los juegos 

    const { name } = req.query;

    const allGames = await getAllVideogames(); // arreglo de juegos concatenados

    if (name) {  // si me llega name por query

        // voy a filtrar del arreglo con TODOS los juegos, el q coincida con el name de la query
        const gameForName = await allGames.filter(game =>
            game.name.toLowerCase().includes(name.toLowerCase()));

        // **** pero q pasa si hay más de 1 juego con el mismo nombre? FILTER 
        //                      no me trae sólo el 1ro q coincida????  
        //      el readme dice traer los primeros 15 q coincidan        *************

        gameForName.length ?
            res.status(200).send(gameForName) :
            res.status(404).send('Juego Inexistente')

    } else {
        res.status(200).send(allGames);
    }
})


module.exports = router;

    

