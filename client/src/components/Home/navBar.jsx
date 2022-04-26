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

        <nav class="navbar navbar-expand-md navbar-light .bg-transparent">

            <div class="container-fluid m-auto">
                <a class="navbar-brand">-Luci App- </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    
                    <div class="nav ms-auto d-md-flex flex-colum flex-md-row ">
                        <div class="row d-md-flex justify-content-between">

                            <div class="col-12 my-3 col-md-4 my-md-0">
                                <Link to='/videogame'>
                                <button class="btn btn-light w-100 p-2" type='submit'>Crea Tu Videojuego</button></Link>

                            </div>

                            <div class="col-12 col-md-2">
                                <a class="nav-link" href="#" onClick={e => handleClick(e)}>Refrescar</a>
                            </div> 

                            <div class="col-12 col-md-6">
                                <form class="d-flex justify-content-center">
                                    <input class="form-control me-2 w-auto p-2"
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
                    </div>


                </div>
            
        </nav>

    )

}


{/* <Link to='/videogame'>
<button class="btn btn-light btn-lg" type="button">Crea Tu Videojuego</button></Link>
<button type="button" class="btn btn-light btn-sm" onClick={e => handleClick(e)}>Refrescar</button> */}