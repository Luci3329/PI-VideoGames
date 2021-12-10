import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';

export default function Detail(props) {
    console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const myGame = useSelector((state => state.detail))
    console.log(myGame)

    return (

        <div className='detail'>

            <Link to='/home'>
                <button>Volver</button>
            </Link>

            {
                myGame.length ?

                    <div>

                        <h1>Nombre {myGame[0].name}</h1>
                        <p>Descripcion {myGame[0].description}</p>
                        <p>Fecha de Lanzamiento {myGame[0].released}</p>
                        <p>Rating {myGame[0].rating}</p>
                        <p>Plataformas {myGame[0].platforms}</p>
                        <img src={myGame[0].background_image} />
                        <p>Géneros {myGame[0].genres}</p>
                        

                    </div> : <p>Loading ...</p>
            }

        </div>


    )
}
