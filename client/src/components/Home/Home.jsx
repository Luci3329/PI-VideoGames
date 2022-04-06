import React from 'react';
import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
// useState -> funcion que nos devuelve un array con dos elem:  [state, metodo para mutarlo] 
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterCreated, orderByGame, listGenres, filterByGenres } from '../../actions';
import { Link } from 'react-router-dom';
import CardList from '../Card/CardList';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './Home.css';
import NavLuci from './navBar.jsx';


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


    /* useEffect(() => { 
        dispatch(getVideogames())
    }, [dispatch]) */

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listGenres())
    }, []);

    /* function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    } */

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



    return (
        <div className='home'>

            <div>
                <NavLuci />
            </div>



            {/* <nav className='barraPrincipal'>

                <div className='volver'>
                    <button className="bp_volver" onClick={e => handleClick(e)}>
                        Refrescar
                    </button>
                </div>

                <div className='search'>
                    <SearchBar />
                </div>

                <div className='creacion'>
                    <Link to='/videogame'><button className="bp">Crea tu Videojuego!</button></Link>
                </div>


            </nav> */}

            <br />
            <h1 className='Videogames'>Videogames</h1>
            <br />

            <div class="form-floating">
                <select class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={e => handleFilterByCreated(e)}>
                    <option selected>Todos Los Juegos</option>
                    <option value="1">Todos Los Juegos</option>
                    <option value="2">Creaciones</option>
                </select>
                <label for="floatingSelect">Filtro por Juego</label>
            </div>

            <div class="form-floating">
                <select class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={e => handleFilterByGenres(e)}>
                    <option value="4">Todos Los Géneros</option>
                    {genress &&
                        genress.map(el => (
                            <option
                                value={el}>{el}</option>
                        ))}
                </select>
                <label for="floatingSelect">Filtro por Género</label>
            </div>


            <div class="form-floating">
                <select class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={e => handleSort(e)}>
                    <option selected>abc</option>
                    <option value="5">Ascendente</option>
                    <option value="6">Descendente</option>
                </select>
                <label for="floatingSelect">Ordenamiento</label>
            </div>

            {/* <div className='select'>
                <select className="select1" placeholder='Orden ASC - DES' onChange={e => handleSort(e)}>
                    <option value='asc'>Orden ASC</option>
                    <option value='desc'>Orden DES</option>
                </select>


                <select className="select2" onChange={e => handleFilterByCreated(e)}>
                    <option value='All'>Todos Los Juegos ...</option>
                    <option value='Created'>Creados</option>
                </select>


                <select className="select3" onChange={e => handleFilterByGenres(e)}>
                    <option value='All'>Todos Los Géneros ...</option>
                    {genress &&
                        genress.map(el => (
                            <option
                                value={el}>{el}</option>
                        ))}
                </select>
            </div> */}

            <br />
            <Paginado
                gamesPorPag={gamesPorPag}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />
            <br />


            <CardList
                games={gamesPagActual} />

            {/* <div class="container">
                <div class="row">

                    {
                        gamesPagActual?.map((el) => {
                            return (
                                <div className='col-md-4"'>
                                    <Link to={'/videogame/' + el.id} >
                                        <Card name={el.name} background_image={el.background_image} rating={el.rating} genres={el.genres} key={el.id} />
                                    </Link>
                                </div>
                            );

                        })
                    }
                </div>
            </div> */}

        </div>
    )
}
// display flex para las card