import React from 'react';
import './Card.css'

export default function Card({ name, background_image, rating, genres }) {
    // no necesito traerme ningún estado xq ya tengo la lógica en el Home

    return (

        <div class="container-fluid luci">
            <div class="row">

                <div class="todo col-md-2">
                    < div class="card" style={{ width: "15rem", height: "22em" }} >

                        <img src={background_image} class="otra" alt={name} />
                        <h5 class="card-title text-center">{name}</h5>

                        <div class="card-body mt-auto">
                            
                            <p class="card-text" style={{ fontSize: "15px" }} ><strong>Género/s: </strong><br />{genres.map(el => el.name).join(' - ')}</p>
                            <p class="card-text" style={{ fontSize: "15px", paddingTop: "auto" }} ><strong>Rating: </strong>{rating}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )

}


