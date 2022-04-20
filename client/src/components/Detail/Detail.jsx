import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import './Detail.css';

export default function Detail(props) {
    //console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [props.match.params.id])

    const myVideogame = useSelector((state) => state.detail)
    console.log(myVideogame);

    return (

        <div className='contenedor'>

            <div className='titulo'>
                <h3 class="card-title">{myVideogame.name}</h3>
            </div>


            <div class="descripcion">
                <p className='texto' lang="es"><img src={myVideogame.background_image} class="card-img-top" align="left" alt="imagen" />
                    {myVideogame.description}</p>
            </div>

            <div class="card-body">

                <p class="card-text">
                    <h6 className='subtitulo'>Fecha de Lanzamiento</h6>
                    <span>{myVideogame.released?.slice(0, 10)}</span></p>

                <p class="card-text">
                    <h6 className='subtitulo'>Rating</h6>
                    <span>{myVideogame.rating}</span></p>
            </div>

            <div className='card-body2'>
                <ul class="card-text">
                    <h6 className='subtitulo'>Plataformas</h6>
                    {
                        myVideogame.platforms &&
                        myVideogame.platforms?.map(elem => <li className='lista' key={elem}><span className='viñ'>{elem}</span></li>)
                    }
                </ul>
            </div>

            <div className='card-body3'>
                <ul class="card-text">
                    <h6 className='subtitulo'>Géneros</h6>
                    {
                        myVideogame.genres &&
                        myVideogame.genres?.map(gen => <li className='lista' key={gen.id} ><span className='viñ'>{gen.name}</span></li>)
                    }
                </ul>
            </div>
            <div className='volver'>
                <Link to='/home'>
                    <button class="btn btn-light" type="button">Volver</button></Link>
            </div>




        </div >
    )
}




