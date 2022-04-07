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

        <div className='container'>

            <div className='titulo'>
                <h3 class="card-title">{myVideogame.name}</h3>
            </div>

            <div class="imagen" style={{ width: "18rem;" }}>
                <img src={myVideogame.background_image} class="card-img-top" alt="imagen" />
            </div>

            <div class="descripcion"><p>{myVideogame.description}</p></div>

            <div class="card-body">

                <p class="card-text">
                    <h6>Fecha de Lanzamiento</h6>
                    <span>{myVideogame.released}</span></p>

                <p class="card-text">
                    <h6>Rating</h6>
                    <span>{myVideogame.rating}</span></p>
            </div>

            <div className='card-body2'>
                <ul class="card-text">
                    <h6>Plataformas</h6>
                    {
                        myVideogame.platforms &&
                        myVideogame.platforms?.map(elem => <li key={elem} >{elem}</li>)
                    }
                </ul>

                <ul class="card-text">
                    <h6>Géneros</h6>
                    {
                        myVideogame.genres &&
                        myVideogame.genres?.map(gen => <li key={gen.id} >{gen.name} - </li>)
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




