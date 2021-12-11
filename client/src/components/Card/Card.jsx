import React from 'react';
import './Card.css'

export default function Card({ name, background_image, rating, genres }) {
    // no necesito traerme ningún estado xq ya tengo la lógica en el Home

    return (




        <div className='card'>

            <h2 className='namet' >{name}</h2>
            <img className='img' src={background_image} alt={name} />
            <h5>{genres.map(el => el + ' * ')}</h5>

        </div>




    )

}





