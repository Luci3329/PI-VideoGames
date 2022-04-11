import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getVideogames } from '../../actions/index.js';

export default function Error() {

    // ------- PARA VOLVER A CARGAR TODOS LOS JUEGOS

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }


    return (

        <div class="alert alert-primary d-flex align-items-center justify-content-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Lo Sentimos!</h4>
                <p>Tu Juego no se encuentra en nuestra Base de Datos</p>
                <hr />
                <p class="mb-0">PERO PODES CREARLO VOS MISMO  ;) </p>
                <br />

                <div class="row">
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <Link to='/home'> <button class="btn btn-link" onClick={e => handleClick(e)}>
                            Volver</button></Link><br />

                    </div>

                    <div class="d-grid gap-2 col-6">
                    <Link to='/videogame'><button class="btn btn-light w-auto p-1" type='submit'>
                        Crea Tu Videojuego</button></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

