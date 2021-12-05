
// ************ ACTIONS *******************


import axios from 'axios';

// store -> contiene el estado de la aplicación
// dispatch -> permite q se modifique el store (se actualiza el estado -> acción)
// la función dispatch es la encargada de enviar las acciones al store.
// las acciones se disparan a través de EVENTOS
// disptach -> acción -> reduce (nuevo store)
// payload -> información para poder modificar el store

export function getVideogames(){
    return async function (dispatch){
        var json = await axios.get( 'http://localhost:3001/videogames', {}); 
        return dispatch ({
            type : 'GET_VIDEOGAMES',
            payload : json.data
        })
    }
}

export function filterCreated (payload){
    return {
        type : 'FILTER_CREATED' ,
        payload
    }
}

export function orderByGame (payload){
    return {
        type : 'ORDER_BY_GAME' ,
        payload
    }
}

export function listGenres() {
    return async function (dispatch) {
        var g = await axios.get('http://localhost:3001/genres', {});
        return dispatch ({
            type: 'LIST_GENRES',
            payload: g.data   // [ {} {} {} ... ]     

        }) // con ésta acción me traje la lista de géneros para mostrar en las <option>
        // de mi filtrado por género ** también me sirve para el form??

    }
}

export function genresFilter (payload){
    return {
        type : 'GENRES_FILTER' ,
        payload
    }
}

export function getNameGame(game){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/videogames?name='+game, {});
            return dispatch({
                type : 'GET_NAME_GAME',
                payload : json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postVideogames(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/videogame', payload);
        return response;
    }
}

export function listInfo(){
    return async function (dispatch) {
        console.log("Get platforms/genre pedido");
        var p = axios.get('http://localhost:3001', {})
          return dispatch({
            type: "LIST_INFO",
            payload: p.data,
          });
        };
      }; // me trae { genres : [ ... ], platforms : [ ... ]}
    


// ***************** REDUCER *****************


// La función del REDUCER es manipular el state y su contenido 
// Siempre retorna un nuevo state y le avisa del cambio a los componentes

const initialState = {
    videogames: [],  // estado q renderizo
    allVideogames: [],  // estado q siempre tiene TODO -> para q no me filtre sobre lo filtrado
    genres: [],
    filterGenres: [],
    platforms: []
}

function rootReducer(state = initialState, action) {   // acá van a ir todas mis acciones

    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }

        case 'FILTER_CREATED':

            const allVideogames = state.allVideogames
            const createdFilter = action.payload === 'Created' ?
                allVideogames.filter(el => el.createdInDB) :
                allVideogames.filter(el => !el.createdInDB)

            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }

        case 'ORDER_BY_GAME':

            let sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })

            return {
                ...state,
                videogames: sortedArr
            }

        /* case 'LIST_GENRES':

            //const arrGenres = state.genres
            //const genresFilter = action.payload === 'All' ? arrGenres :
            //arrGenres.filter(el => el.name === action.payload)

            const genresFilter = action.payload.map(el => el.name)


            return {
                ...state,
                genres: genresFilter
            } */


        /* case 'GENRES_FILTER':
            //const genres = state.genres
            const allGames = state.allVideogames
            const gamesFiltered = allGames.map(el => el.genres.map(g => g === action.payload))

            return {
                ...state,
                filterGenres: gamesFiltered
            }

        case 'GET_NAME_GAME':
            return {
                ...state,
                videogames: action.payload
            }
 */

        case 'LIST_INFO': // me traigo todo de mi ruta getInfo
            const genres = action.payload.genres;//.map(genre => genre.name);
            const platforms = action.payload.platforms;
            return {
                ...state,
                genres: genres,
                platforms: platforms
            }

        case 'POST_VIDEOGAMES' :
            return {
                ...state   // no hacemos nada aquí xq creamos en una nueva ruta
            }    
            
        default:
            return state;
    }
}

export default rootReducer;



// *********** SEARCH BAR *************************

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame } from '../../actions';

export default function SearchBar (){
    
    const dispatch = useDispatch()
    const [ game, setGame ] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setGame(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameGame(game))
        setGame('');   // NO FUNCIONA, no me lo borra cuando termina de buscar -> VER!!!
    }

    return (

        <div>
            <input
            type='text'
            placeholder='Buscar...'
            onChange={ e => handleInputChange(e) } />

            <button 
            type='submit'
            onClick={ e => handleSubmit(e) }>Buscar</button>

        </div>
    )
}


//  ****************** NEW GAME *******************

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames, listInfo } from '../../actions';

export default function NewGame() {

    const dispatch = useDispatch()
    const history = useHistory()   // para redireccionar una vez creado el juego -> voy a /home

    const [input, setInput] = useState({
        name: '',
        description: '',
        Released: '',
        rating: '',
        genres: [],
        platforms: []
    })

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listInfo())
    }, []);

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
            genres: [],
            platforms: []
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
                <ul> <li> { input.genres.map( el => el+' - ')}</li> </ul>

                <select onChange={e => handleSelect(e)}>
                    {
                        input.platforms.map( p=> {
                            <option value={ p.name }>{p.name}</option>
                        })
                    }
                </select>
                <ul> <li> { input.platforms.map( el => el+' - ')}</li> </ul>    

                <button type= 'submit'>Crear Juego</button>

            </form>


        </div>



    )


}

// *************** HOME *******************

import React from 'react';
import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
// useState -> funcion que nos devuelve un array con dos elem:  [state, metodo para mutarlo] 
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterCreated, orderByGame, listGenres, genresFilter } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar.jsx';


export default function Home() {

    const dispatch = useDispatch(); // conecto a mi componente con Redux

    // ********* RENDERIZADO DE TODOS LOS GAMES ************
    const allVideogames = useSelector((state) => state.videogames) // selecciona el estado global de Redux
    // nos permite extraer datos del store de Redux utilizando una función selectora
    //console.log(allVideogames)
    //console.log(state.videogames)

    const allGenres = useSelector( state => state.genres )
    //console.log(allGenres);
    const filterByGenre = useSelector( state => state.filterGenres)
    const [filter, setFilter] = useState('')

    // *********** ORDENAMIENTO ASC - DES  ****************
    const [order, setOrder] = useState('')

    //  ********** PARA EL PAGINADO **********************
    const [pagActual, setPagActual] = useState(1)
    const [gamesPorPag, setGamesPorPag] = useState(15)
    const indexUltimoGame = pagActual * gamesPorPag
    //  inicialmente 15   ->    1      *    15

    const indexPrimerGame = indexUltimoGame - gamesPorPag
    //  inicialmente 0   ->      15      -       15

    const gamesPagActual = allVideogames.slice(indexPrimerGame, indexUltimoGame)
    // me traigo esa porción de juegos del 1 al 14

    const paginado = (pagNum) => {
        setPagActual(pagNum)
    }


    useEffect(() => {   // tendría q agregarle la función del FilterGenre??
        dispatch(getVideogames())
    }, [dispatch]) // ese 2do arg [] es de lo q depende la ejecución del dispatch (condición/dependencias)
    // a q estado debe hacerle 'seguimiento' -> ComponentDidUpdat -> ACTUALIZACIÓN  

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }
    
    function handleFilterByCreated(e) {
        dispatch(filterCreated(e.target.value))
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByGame(e.target.value))
        setPagActual(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    useEffect( () => {  // para el renderizado de la lista de géneros
        dispatch(listGenres())
    }, [dispatch])
    
    function handleFilterGenres(e) {
        dispatch(genresFilter(e.target.value))
        setPagActual(1);
        setFilter(`Filtrado ${e.target.value}`)
    }

    return (
        <div>

            <Link to='/videogame'>New Videogame</Link>
            <h1>Videogames</h1>
            <button onClick= { e => handleClick(e) }>
                Volver a cargar todos los Videojuegos
            </button>

            <div>
            <select onChange={e => handleSort(e)}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>


            <select onChange={e => handleFilterByCreated(e)}>
                <option value='All'>Todos</option>
                <option value='Created'>Creados</option>
            </select>

            <select onChange={e => handleFilterGenres(e)}>
            <option value='All'>All</option>
                {allGenres &&
                    allGenres.map( el => (
                        <option value={el}>{el}</option>
                    ))}
            </select>
            </div>

            <Paginado
                gamesPorPag={gamesPorPag}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />

            <SearchBar />

            {
                gamesPagActual?.map((el) => {
                    return (
                        <div>
                            <Link to={'/home/' + el.id} >
                                <Card name={el.name} background_image={el.background_image} rating={el.rating} genres={el.genres} key={el.id} />
                            </Link>
                        </div>
                    );

                })
            }

        </div>
    )
}

// ********************* 


/* export function listGenres() {
    return async function (dispatch) {
        var g = await axios.get('http://localhost:3001/genres', {});
        return dispatch ({
            type: 'LIST_GENRES',
            payload: g.data   // [ {} {} {} ... ]     

        }) // con ésta acción me traje la lista de géneros para mostrar en las <option>
        // de mi filtrado por género ** también me sirve para el form??

    }
} */

/* export function genresFilter (payload){
    return {
        type : 'GENRES_FILTER' ,
        payload
    }
} */