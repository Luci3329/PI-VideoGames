import React from 'react';
import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
// useState -> funcion que nos devuelve un array con dos elem:  [state, metodo para mutarlo] 
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterCreated, orderByGame, listGenres, filterByGenres } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './Home.css';


export default function Home() {

    const dispatch = useDispatch(); // conecto a mi componente con Redux

    // ********* RENDERIZADO DE TODOS LOS GAMES ************
    const allVideogames = useSelector((state) => state.videogames) // selecciona el estado global de Redux
    // nos permite extraer datos del store de Redux utilizando una función selectora
    //console.log(allVideogames)
    //console.log(state.videogames)

    const genress = useSelector(state => state.genres)
    //console.log(genress)

    /* const [ genre, setGenre ] = useState( {
        genres : []
    }) */

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

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listGenres())
    }, []);

    function handleClick(e) {
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



    function handleFilterByGenres(e) {
        dispatch(filterByGenres(e.target.value))
        /* setGenre({
            ...genre,
            genres: [...genre.genres, e.target.value]
        }) */
    };

    /*  function handleFilterGenre(e){
         dispatch(filterByGenres(e))
     } 
      */



    return (
        <div className='home'>

            <div>
                <Link to='/videogame'><button className="bp">Crea tu Videojuego!</button></Link>
            </div>

            <div>
                <button className="bp" onClick={e => handleClick(e)}>
                    Volver a cargar
                </button>
            </div>


            <div className='home2'>
                <select className="bp" onChange={e => handleSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>


                <select className="bp" onChange={e => handleFilterByCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='Created'>Creados</option>
                </select>

                <select className="bp" onChange={e => handleFilterByGenres(e)}>
                    <option value='All'>Todos</option>
                    {genress &&
                        genress.map(el => (
                            <option
                                value={el}>{el}</option>
                        ))}
                </select>


                <Paginado
                    gamesPorPag={gamesPorPag}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                />

                <SearchBar />

            </div>

            <div className='cardHome'>

                {
                    gamesPagActual?.map((el) => {
                        return (
                            <div className='cardsContainer'>
                                <Link to={'/videogame/' + el.id} >
                                    <Card name={el.name} background_image={el.background_image} rating={el.rating} genres={el.genres} key={el.id} />
                                </Link>
                            </div>
                        );

                    })
                }

            </div>

        </div>
    )
}
// display flex para las card