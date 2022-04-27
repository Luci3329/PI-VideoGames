import React from 'react';
import './Card.css'

export default function Card({ name, background_image, rating, genres }) {
    // no necesito traerme ningún estado xq ya tengo la lógica en el Home

    return (



        <div class="col">
            < div class="card">
                <div class="card-body">
                    <img src={background_image} class="card-img-top otra h-100" alt={name} />


                    <div class="card-text">
                        <h5 class="nombre">{name}</h5>
                        <p class="generos" style={{ fontSize: "15px" }} ><strong>Género/s: </strong><br />{genres.map(el => el.name).join(' - ')}</p>
                        <p class="rating" style={{ fontSize: "15px", paddingTop: "auto" }} ><strong>Rating: </strong>{rating}</p>
                    </div>
                </div>
            </div>
        </div>





    )

}


