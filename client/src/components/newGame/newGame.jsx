import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames, listGenres, listPlatforms } from '../../actions';
//import './NewGame.css';

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
        rating: 0,
        platforms: [],
        genres: []

    })


    // acá guardo las cosas q el usuario va escribiendo -> estado local input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) // DINÁMICO -> va a ir tomando los valores de los inputs y los va modificando según lo escrito
    }

    function handleSelectGenres(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleSelectPlataforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
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
            rating: 0,
            platforms: [],
            genres: []

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
    }, [dispatch]);
    //lo saqué xq me traía problemas con la acción ListInfo y además rompía el SearchBar 

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listPlatforms())
    }, [dispatch]);

    return (

        <div>
            <Link to='/home'> <button className='boton'>Volver</button></Link>
            <h2 className='crea'>Crea tu Videojuego!</h2>

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
                    <select onChange={(e) => handleSelectPlataforms(e)}>


                        {
                            platforms?.map((platform) => {
                                return <option value={platform} key={platform} name="platforms"> {platform} </option>
                            })}
                    </select>

                </div>

                <div>
                    <label>Género/s </label>
                    <select onChange={(e) => handleSelectGenres(e)}>

                        {
                            genres?.map((genre) => {
                                return <option value={genre} key={genre}> {genre} </option>
                            })}
                    </select>
                </div>

                <button className='boton' type='submit'>Crear Juego</button>

            </form>

            

            {input.genres &&
                input.genres.map(el => {
                    return (
                    <div>
                        <h5 key={el}>{el}</h5>
                        <button className='boton X'
                            onClick={() => handleDeleteGenre(el)} > X </button>
                    </div>
                )
            })}

            {input.platforms &&
                input.platforms.map(el => {
                    return (
                    <div>
                        <h5 key={el}>{el}</h5>
                        <button className='boton X'
                            onClick={() => handleDeletePlatform(el)} > X </button>
                    </div>
                )
            })}


        </div>



    )


}