import React from 'react';
import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, orderByGame, orderByRating, listGenres, filterByGenres } from '../../actions';
import CardList from '../Card/CardList';
import Paginado from '../Paginado/Paginado';
import SortSelect from '../SortSelect/SortSelect';
import './Home.css';
import NavLuci from './navBar.jsx';
import Error from './Error.jsx';


export default function Home() {

    const dispatch = useDispatch(); // conecto a mi componente con Redux

    // ********* RENDERIZADO DE TODOS LOS GAMES ************
    const allVideogames = useSelector((state) => state.videogames) // selecciona el estado global de Redux


    const genress = useSelector(state => state.genres)

    // ordeno los generos alfabéticamente para q sea más facil encontrarlos en el select
    let sortGenres = genress.sort(function (a, b) {
        if (a > b) return 1;
        if (b > a) return -1;
        return 0;
    })


    // *********** ORDENAMIENTO ASC - DES  ****************
    const [order, setOrder] = useState('')
    const [sort, setSort] = useState('Orden Por Juego');

    function handleSort(e) {
        e.preventDefault();
        if (sort === "Orden Por Juego") setSort("Orden Por Rating");
        if (sort === "Orden Por Rating") setSort("Orden Por Juego")
    };

    function orderGame(e) { // ordenamiento por nombre
        dispatch(orderByGame(e.target.value))
        setPagActual(1);
        setOrder(e.target.value)
    };


    function orderRating(e) { // ordenamiento por rating
        dispatch(orderByRating(e.target.value))
        setPagActual(1);
        setOrder(e.target.value)
    };


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

    useEffect(() => {
        dispatch(listGenres())
    }, []);

    // FILTRO SEGÚN ORIGEN
    function handleFilterByCreated(e) {
        dispatch(filterCreated(e.target.value))
    };

    // FILTRO POR GÉNERO
    function handleFilterByGenres(e) {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value))
    };



    return (
        <div className="app">

            <div>
                <NavLuci />
            </div>

            <br />
            <div className='conteiner'> {/* **** EN PANTALLAS PEQUEÑAS SE DIVIDE LA PALABRA **** */}
                <div className="row">

                    <div class='Videogames d-md-none col-12 mx-auto'>Video</div>
                    <div class='Videogames d-md-none col-12 mx-auto'>Games</div>

                </div>
            </div>

            <div className='conteiner'> {/* **** EN PANTALLAS GRANDES SE MUESTRA ENTERA **** */}
                <div className="row">

                    <div class='Videogames d-none d-md-block col-md-6 mx-auto mx-md-auto'>Videogames</div>

                </div>
            </div>

            <br />

            <div class="container">
                <div class="row">

                    <div class="col-12 col-md-4">
                        <div class="form-floating">
                            <select class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                onChange={e => handleFilterByCreated(e)}>
                                <option selected>Todos Los Juegos</option>
                                <option value="1">Todos Los Juegos</option>
                                <option value="2">Creaciones</option>
                            </select>
                            <label className='fuerte' for="floatingSelect">Filtro por Origen</label>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">
                        <div class="form-floating">
                            <select class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                onChange={e => handleFilterByGenres(e)}>
                                <option value="4">Todos Los Géneros</option>
                                {sortGenres &&
                                    sortGenres.map(el => (
                                        <option
                                            value={el}>{el}</option>
                                    ))}
                            </select>
                            <label className='fuerte' for="floatingSelect">Filtro por Género</label>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">

                        <div class="form-floating d-flex">
 
                            <button type="button"
                                class="btn flex-fill"
                                value={sort}
                                onClick={(e) => handleSort(e)}
                            >{sort}</button>

                            {sort === "Orden Por Juego" ? (

                                <SortSelect
                                    handleSort={orderGame}
                                    sortDescription="Orden Alfabético"
                                />

                            ) : (

                                <SortSelect
                                    handleSort={orderRating}
                                    sortDescription="Orden Alfabético"
                                />

                            )}
                        </div>
                    </div>

                </div>
            </div>

            <br />
            <Paginado
                gamesPorPag={gamesPorPag}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />
            <br />

                {
                    allVideogames === "VideoGame no encontrado" ? <Error /> :

                        <CardList games={gamesPagActual} />
                }
            
        </div >
    )
}
