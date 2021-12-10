const { Router } = require('express');
const { Videogame, Genre } = require('../db');


const router = Router();


router.post('/', async (req, res) => { // viene todo del form del front x body
    const { name, description, background_image, releaseDate, rating, platforms, createdInDb, genres } = req.body;

    // **************** VER VERIFICACIÓN ********************

    //let plataformsString = plataforms.join(', ') // **** VER! como viene plataforms de la api??

    //console.log(Videogame);
    let gameCreated = await Videogame.create({ // creo desde la bd --> ojo con el conn.sync({ force: false })
                                               // cuando levanto el servidor tengo todo lo q ya creé 
            name,
            description,
            background_image,
            releaseDate,
            rating,
            platforms: platforms, //.map(p => p.platform.name) AHORA son string 
            createdInDb // seteada en true -> en las pruebas no la paso, pero me tiene q llegar
        })

    
    // un juego --> más de 1 género [ " ", " " ] // if(genres.length > 1){ (si seleccionan más de 1)
    // buso en mi tabla Genre aquel género (name) q coincida con el q pasan por body
    const genresDB = await Genre.findAll({
        where : { name : genres }
    })
    
    gameCreated.addGenre(genresDB); // mixing -> se incorpora el nuevo juego a la tabla de géneros
        
    gameCreated ? 
    res.json({ msg: "Congratulations! You created a new game!" }) :
    res.json({ msg: "Videogame Not Found!" });
})


module.exports = router;