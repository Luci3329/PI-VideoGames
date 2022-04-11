require('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default;
const { RAWG_API_KEY } = process.env;
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');

const router = Router();


function mapeoGames(arr) {
    const data = arr.map(g => {
        return {
            id: g.id,
            name: g.name,
            background_image: g.background_image,
            genres: g.genres.map(gen => { return { name: gen.name } }),
            rating: g.rating,
            released: g.released,
            platforms: g.platforms.map(el => el.platform.name)
        }
    })
    return data;
}

async function getApiInfo() {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`);
    var requestFiltrado = mapeoGames(apiUrl.data.results);
    //entro al bendito next para traer los 100
    var nextApi = apiUrl.data.next;

    while (requestFiltrado.length < 100) {
        const actualNext = await axios.get(nextApi);
        const newPedido = await mapeoGames(actualNext.data.results)
        requestFiltrado = [...requestFiltrado, ...newPedido];

        nextApi = actualNext.data.next

    }
    //console.log(requestFiltrado.length);
    return requestFiltrado;
}

async function getDbInfo() {
    return await Videogame.findAll({
        include: Genre
    });
}

async function allGames() {
    const api = await getApiInfo();
    const db = await getDbInfo()
    let todosGames = api.concat(db);
    return todosGames;
}




router.get('/', async (req, res, next) => {
    // en ésta ruta tenemos q poder buscar un juego x query y traernos todos los juegos 
    // primero me traigo los de la base de datos y los guardo (junto con los géneros concatenados) en un arr

    const { name } = req.query;
    try {
        if (name) {
            const searchApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${RAWG_API_KEY}`);
            var gamesDb = await Videogame.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` },
                },
                include: Genre
            });
            let gamesFilter = mapeoGames(searchApi.data.results)
            let gamesBuscado = gamesDb.concat(gamesFilter);
            if (gamesBuscado.length > 0) {
                res.status(200).send(gamesBuscado);
            } else {
                res.status(200).send('VideoGame no encontrado')
            }
        } else {
            const games = await allGames();
            res.status(200).send(games)
        }
    } catch (error) {
        console.log(error);
    }

})


module.exports = router;



