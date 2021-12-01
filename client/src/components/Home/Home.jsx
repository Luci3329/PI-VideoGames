import React from 'react';
import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
// useState -> funcion que nos devuelve un array con dos elem:  [state, metodo para mutarlo] 
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterCreated, orderByGame, listGenres, genresFilter } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';


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

            <Link to='/newVideogame'>New Videogame</Link>
            <h1>Videogames</h1>
            <button>
                Volver a cargar todos los Videojuegos
            </button>


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

            <Paginado
                gamesPorPag={gamesPorPag}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />

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