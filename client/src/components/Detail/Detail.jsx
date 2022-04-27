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
        <div className="container ancho">
            
            <div class='conteiner m-4'>
                <div class='row titulo'>

                    <div class="col-12 m-2 text-center">
                        <h5 class="name display-6">{myVideogame.name}</h5>
                    </div>

                    <div class="col-12 descripcion">
                        <div class="row">
                            <div class="col-12 col-md-4 text-center img">
                                <img src={myVideogame.background_image} class="card-img-top h-100" alt="imagen" />
                            </div>

                            <div class="col-12 col-md-8 text-center pt-auto desc">
                                <p class='texto mt-3' lang="es">{myVideogame.description}</p>
                            </div>

                        </div>
                    </div>


                    <div class="col-12 mt-4">
                        <div class="row text-center">

                            <div class="col-12 col-md-4 card-body">

                                <p class="card-text">
                                    <h6 class='subtitulo'>Fecha de Lanzamiento</h6>
                                    <span>{myVideogame.released?.slice(0, 10)}</span></p>

                                <p class="card-text">
                                    <h6 className='subtitulo'>Rating</h6>
                                    <span>{myVideogame.rating}</span></p>
                            </div>

                            <div class='col-12 col-md-4 card-body2'>
                                <ul class="list-inline">
                                    <h6 class='subtitulo'>Plataformas</h6>
                                    {
                                        myVideogame.platforms &&
                                        myVideogame.platforms?.map(elem => <li className='lista' key={elem}><span className='viñ'>{elem}</span></li>)
                                    }
                                </ul>
                            </div>

                            <div class='col-12 col-md-4 card-body3'>
                                <ul class="list-inline">
                                    <h6 class='subtitulo'>Géneros</h6>
                                    {
                                        myVideogame.genres &&
                                        myVideogame.genres?.map(gen => <li className='lista' key={gen.id} ><span className='viñ'>{gen.name}</span></li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class='col-12 mt-4 text-center'>
                        <Link to='/home'>
                            <button class="btn btn-light" type="button">Volver</button></Link>
                    </div>



                </div>
            </div >
        </div>

    )
}




