import React from 'react';

export default function Card( {name, background_image, rating, genres }){
    // no necesito traerme ningún estado xq ya tengo la lógica en el Home

    return(

        <div>
            <h3>{ name }</h3>
            
            <img src = { background_image } alt= 'Img not found' width='200px' height='250px' />
            <h5>Rating : { rating }</h5>
            <h5>Género : { genres }</h5>
        </div>
    )

}

