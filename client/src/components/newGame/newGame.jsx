import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames, listInfo } from '../../actions';

export default function NewGame() {

    const dispatch = useDispatch()
    const history = useHistory()   // para redireccionar una vez creado el juego -> voy a /home

    const genres = useSelector( state => state.genres )
    const platforms = useSelector( state => state.platforms )

    const [input, setInput] = useState({
        name: '',
        description: '',
        Released: '',
        rating: '',
        genres: [...genres],
        platforms: [...platforms]
    })

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listInfo())
    }, []);
    //lo saqué xq me traía problemas con la acción ListInfo y además rompía el SearchBar 

    // acá guardo las cosas q el usuario va escribiendo -> estado local input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) // DINÁMICO -> va a ir tomando los valores de los inputs y los va modificando según lo escrito
    }

    function handleSelect(e) { // tengo 2 select : genres y platforms -> PUEDE FALLAR DECÍA TUSAN!
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
            platforms: [...input.platforms, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(input);
        dispatch(postVideogames(input))
        alert('Juego Creado Exitosamente!')
        setInput({   // para q al terminar me deje todos los input en blanco nuevamente
            name: '',
            description: '',
            Released: '',
            rating: '',
            genres: genres,
            platforms: platforms
        })
        history.push('/home') // useHistory -> me redirecciona al Home
    }


    return (

        <div>
            <Link to='/home'> <button>Volver</button></Link>
            <h1>Crea tu Videojuego!</h1>

            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Descripcion:</label>
                    <input
                        type='text'
                        value={input.description}
                        name='descripcion'
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Fecha de Lanzamiento:</label>
                    <input
                        type='date'
                        value={input.Released}
                        name='descripcion'
                        onChange={e => handleChange(e)} />
                </div>

                <div>
                    <label>Rating:</label>
                    <input
                        type='number'
                        value={input.rating}
                        name='rating'
                        onChange={e => handleChange(e)} />
                </div>

                <select onChange={e => handleSelect(e)}>
                    
                    {
                        input.genres.map(g => {
                            <option value={g.name}>{g.name}</option>
                        })
                    }
                </select >
                <ul> <li> {input.genres.map(el => el + ' - ')}</li> </ul>

                <select onChange={e => handleSelect(e)}>
                    
                    {
                        input.platforms.map(p => {
                            <option value={p.name}>{p.name}</option>
                        })
                    }
                </select>
                <ul> <li> {input.platforms.map(el => el + ' - ')}</li> </ul>

                <button type='submit'>Crear Juego</button>

            </form>


        </div>



    )


}