import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames, listGenres } from '../../actions';

export default function NewGame() {

    const dispatch = useDispatch()
    const history = useHistory()   // para redireccionar una vez creado el juego -> voy a /home

    const genres = useSelector(state => state.genres)
    //console.log(genres) // arreglo de strings
    const platforms = useSelector(state => state.platforms)
    //console.log(platforms)

    const [input, setInput] = useState({
        name: '',
        description: '',
        background_image: '',
        released: '',
        rating: '',
        platforms: '',
        genres: ''

    })


    // acá guardo las cosas q el usuario va escribiendo -> estado local input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) // DINÁMICO -> va a ir tomando los valores de los inputs y los va modificando según lo escrito
    }

    function handleSelectPlat(e) { // tengo 2 select : genres y platforms -> PUEDE FALLAR DECÍA TUSAN!
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
            
        })
            //platforms: [...input.platforms, e.target.value],
            //genres: [...input.genres, e.target.value]
    }

    
    function handleSelectGen(e) { // tengo 2 select : genres y platforms -> PUEDE FALLAR DECÍA TUSAN!
        setInput({
            ...input,
            
            genres: [...input.genres, e.target.value]
        })
            //platforms: [...input.platforms, e.target.value],
            //genres: [...input.genres, e.target.value]
    }


    function handleSubmit(e) {
        e.preventDefault()
        //console.log(input);
        dispatch(postVideogames(input))
        alert('Juego Creado Exitosamente!')
        setInput({   // para q al terminar me deje todos los input en blanco nuevamente
            name: '',
            description: '',
            background_image: '',
            released: '',
            rating: '',
            platforms: '',
            genres: ''

        })
        history.push('/home') // useHistory -> me redirecciona al Home
    }

    function handleDeletePlatform(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== el)
        })
    }

    function handleDeleteGenre(el) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el)
        })
    }

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listGenres())
    }, []);
    //lo saqué xq me traía problemas con la acción ListInfo y además rompía el SearchBar 


    return (

        <div>
            <Link to='/home'> <button>Volver</button></Link>
            <h1>Crea tu Videojuego!</h1>

            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre </label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Descripcion </label>
                    <input
                        type='text'
                        value={input.description}
                        name='description'
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Imagen </label>
                    <input
                        type='text'
                        value={input.background_image}
                        name='background_image' 
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Fecha de Lanzamiento </label>
                    <input
                        type='text'
                        placeholder='dd - mm - aaaa'
                        autoComplete="off"
                        value={input.released}
                        name='released'
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Rating </label>
                    <input
                        type='number'
                        placeholder="5.0"
                        step="0.1"
                        min='0'
                        max='5'
                        value={input.rating}
                        name='rating'
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Plataforma/s </label>
                    <select id="platforms" onClick={e => { handleSelectPlat(e) }}>
                        <option selected value= '' > </option>
                    
                        {platforms &&
                            platforms.map((platform) => (
                                <option
                                    value={platform}
                                    
                                    name="platform"
                                > {platform} </option>
                            ))}
                    </select>

                </div>

                <div>
                    <label>Género/s </label>
                    <select id="genres" onClick={e => { handleSelectGen(e) }}>
                    <option selected value= '' > </option>

                        {genres &&
                            genres.map((genre) => (
                                <option
                                    value={genre}
                                    
                                    name="genres"
                                > {genre} </option>
                            ))}
                    </select>
                </div>

                <button type='submit'>Crear Juego</button>

            </form>

            {input.genres &&
                input.genres.map(el =>
                    <div className='divGenres'>
                        <p>{el}</p>
                        <button className='boton X'
                            onClick={() => handleDeleteGenre(el)} > X </button>
                    </div>
                )}

            {input.platforms &&
                input.platforms.map(el =>
                    <div className='divPlatforms'>
                        <p>{el}</p>
                        <button className='boton X'
                            onClick={() => handleDeletePlatform(el)} > X </button>
                    </div>
                )}


        </div>



    )


}