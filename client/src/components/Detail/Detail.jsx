import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
//import './Detail.css';

export default function Detail(props) {
    console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [props.match.params.id])

    const myGame = useSelector((state => state.detail))
    console.log(myGame)



    return (

        <div className='detail'>


            {
                myGame ?

                    <div className='cardDetail'>

                        <h1> {myGame.name}</h1>

                        <div className='divNuevo'>
                            <img className='img' src={myGame.background_image} alt="imagen" width='200px' height='160px' />
                            <div className='pdes'><p>{myGame.description}</p></div>


                        </div>


                        <div className='lista'>

                            <p>
                                <h4>Fecha de Lanzamiento</h4>
                                <h6>{myGame.released}</h6></p>

                            <p>   <h4>Rating</h4>
                                <h6>{myGame.rating}</h6></p>

                            <p>  <h4>Plataformas</h4>
                                <h6>{myGame.platforms}</h6></p>

                            <p>   <h4>Géneros</h4>
                                <h6>{myGame.genres}</h6></p>



                        </div>




                    </div> : <p>Loading ...</p>
            }


            <Link to='/home'>
                <button className='vr'>Volver</button>
            </Link>

        </div>


    )
}

// PARA QUE NO SE RENDERICEN LOS <tag> en description
//.replace(/(<([^>]+)>)/gi, "") -> lo hice en el back xq acá rompía