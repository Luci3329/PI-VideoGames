import React from 'react';
import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, orderByGame, listGenres, filterByGenres } from '../../actions';
import CardList from '../Card/CardList';
import Paginado from '../Paginado/Paginado';
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
        e.preventDefault();
        dispatch(filterByGenres(e.target.value))
    };



    return (
        <div className='home'>

            <div>
                <NavLuci />
            </div>

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
                    {sortGenres &&
                        sortGenres.map(el => (
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


            <br />
            <Paginado
                gamesPorPag={gamesPorPag}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />
            <br />



            <div>
                {
                    allVideogames === "Juego Inexistente" ? <Error /> :

                        <CardList games={gamesPagActual} />
                }
            </div>
        
        

        </div >
    )
}
