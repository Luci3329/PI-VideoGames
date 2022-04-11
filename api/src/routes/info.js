require('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default;
const { RAWG_API_KEY } = process.env;
const { Genre } = require('../db');



const router = Router();

const getPlatforms = async () => {

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


  let allPlatforms = todos.map((game => {
    return { // me traigo sólo los datos requeridos en página principal
      platforms: game.platforms.map((platform) => platform.platform.name) // [ {} {} {} ]
    }

  }))


  return allPlatforms;

};


router.get('/', async (req, res) => {
  try {
    let platforms = []
    let info = await getPlatforms();
    info.forEach(g => g.platforms.forEach(p => { if (!platforms.includes(p)) { platforms.push(p) } }));


    

    const genresAll = await Genre.findAll();
    const genres = genresAll.map(g => g.name)
    

    return res.json({
      platforms,
      genres
    });

  } catch (err) {
    console.log(err);
  }
}
)

module.exports = router;