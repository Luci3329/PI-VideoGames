import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame, getVideogames } from '../../actions/index';
import { Link } from 'react-router-dom';
import './navBar.css';

export default function NavLuci() {

    const dispatch = useDispatch()
    const [game, setGame] = useState('')

    // -------- PARA EL SEARCH BAR -------

    function handleInputChange(e) {
        e.preventDefault()
        setGame(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameGame(game));
        setGame('');
    }

    // ------- PARA VOLVER A CARGAR TODOS LOS JUEGOS

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <div class="container-fluid">
                <a class="navbar-brand">-Luci App- </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarScroll">

                    <div class="navbar-nav d-flex justify-content-center">

                        <a class="nav-link" aria-current="page" href='/videogame'>Crea Tu Videojuego</a>
                        <a class="nav-link" href="#" onClick={e => handleClick(e)}>Refrescar</a>

                    </div>

                    <div class="d-flex justify-content-end" >

                    <form class="d-flex">
                        <input class="form-control me-2"
                            type="search" placeholder="Cuál es tu juego? "
                            aria-label="Search"
                            value={game}
                            onChange={e => handleInputChange(e)} />

                        <button class="btn btn-outline-success" type="submit"
                            onClick={e => handleSubmit(e)}> Buscar </button>
                    </form>
                    </div>
                </div>
            </div>
        </nav>

    )

}


{/* <Link to='/videogame'>
<button class="btn btn-light btn-lg" type="button">Crea Tu Videojuego</button></Link>
<button type="button" class="btn btn-light btn-sm" onClick={e => handleClick(e)}>Refrescar</button> */}