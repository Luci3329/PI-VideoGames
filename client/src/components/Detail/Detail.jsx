import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
//import './Detail.css';

export default function Detail(props) {
    //console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [props.match.params.id])

    const myGame = useSelector((state => state.detail))
    console.log(myGame)



    return (

        <div>


            {
                Object.keys(myGame).length > 0 ?


                    <div class="card" style="width: 18rem;">
                        <img src={myGame.background_image} class="card-img-top" alt="imagen" />
                        <div class="card-body">
                            <h5 class="card-title">{myGame.name}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to='/home'>
                                <button class="btn btn-light" type="button">Volver</button></Link>
                        </div>
                    </div> : <p>Loading ...</p>

            }

        </div>
    )
}

