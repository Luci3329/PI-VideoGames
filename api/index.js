//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js'); // la base de datos
const axios = require('axios').default;
require('dotenv').config();
const { RAWG_API_KEY } = process.env;
const { Genre } = require('./src/db');



const getGenres = async () => { // trigo todos los géneros de la api a mi base de datos

  try {
      // me trigo todos los géneros de la API y los guardo en mi DB tabla Genre
      const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${RAWG_API_KEY}`);
      genresApi.data.results.forEach(g => { // x cada género de la api creo uno en bd
          Genre.findOrCreate({ // primero busca si ya existe... si no existe la crea -> tengo el servidor en { force: false }
              where: { name: g.name },
              
          });
      });

      const genresDb = await Genre.findAll();

      return genresDb; // json me trae objetos -> VER


  } catch (err) {
      (err) => next(err) // .json({err : 'Gender Not Found!'}) va a ser un bótón, no tengo q responder nada
  }

}

getGenres();




// Syncing all the models at once.
// ** SINCRONIZACIÓN **
conn.sync({ force: false }).then(() => { // cuidado! 
  server.listen(3001, () => { // el back y el front deben andar en puertos diferentes y ambos al tiempo
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}); // .then( () => getGenres() )
