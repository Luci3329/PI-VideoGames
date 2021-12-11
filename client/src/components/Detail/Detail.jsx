import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import './Detail.css';

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
                myGame ?

                    <div className='cardDetail'>

                        <h1> {myGame.name}</h1>

                        <div className='divNuevo'>
                        <img src={myGame.background_image} width="250" height="150px" />
                        <div className='pdes'><p>{myGame.description}</p></div>
                        </div>

                        <p>Fecha de Lanzamiento {myGame.released}</p>
                        <p>Rating {myGame.rating}</p>
                        <p>Plataformas {myGame.platforms}</p>
                        <p>Géneros {myGame.genres}</p>
                        

                    </div> : <p>Loading ...</p>
            }

        </div>


    )
}
