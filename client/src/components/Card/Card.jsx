import React from 'react';
import './Card.css'

export default function Card({ name, background_image, rating, genres }) {
    // no necesito traerme ningún estado xq ya tengo la lógica en el Home

    return (

        <div class="luci">
            <div class="row"> 

                <div class="todo col-md-2">
                    < div class="card" style={{ width: "15rem", height:"22em" }} >

                        <h5 class="card-title text-center">{name}</h5>
                        <img src={background_image} class="otra" /* style={{ width: "220px", height:"160px" }}  */alt={name} />

                        <div class="card-body">
                            <p class="card-text" style={{ fontSize:"15px" }} ><strong>Género/s: </strong><br/>{genres.map(el => el.name).join(' - ')}</p>
                            <p class="card-text" style={{ fontSize:"15px", paddingTop:"-15px" }} ><strong>Rating: </strong>{rating}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  




    )

}


{/* <div className='card'>

            <h2 className='namet' >{name}</h2>
            <img className='img' src={background_image} alt={name} width='200px' height='160px' />
            <h5>Género: {genres.map(el => el + ' / ')}</h5>
            <h5>Rating: {rating}</h5>

        </div> */}


