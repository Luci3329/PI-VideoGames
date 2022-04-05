import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame, getVideogames } from '../../actions/index';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

                    <div class= "d-grid gap-2 col-6 mx-auto" >
                    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ scrollHeight: "100px" }}>
                        
                            <li class="d-grid gap-4 col-6 mx-auto">

                                <Link to='/videogame'>
                                    <button class="btn btn-light" type="button">Crea Tu Videojuego</button></Link>

                            </li>
                       
                        <li class="d-grid gap-4 col-6 mx-auto">
                            <button type="button" class="btn btn-light" onClick={e => handleClick(e)}>Refrescar</button>
                        </li>


                    </ul>
                    </div>

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
        </nav>

    )

}