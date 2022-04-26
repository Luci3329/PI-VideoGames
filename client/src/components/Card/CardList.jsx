import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Error from '../Home/Error.jsx';
import './Card.css'

export default function CardList({ games }) {
    // no necesito traerme ningún estado xq ya tengo la lógica en el Home

    return ( 

        <div className='card1'>

            {games.map(g => {
                if (g.name !== "VideoGame no encontrado") {

                    return (
                        <Link to={'/videogame/' + g.id} >
                            <Card
                                name={g.name}
                                background_image={g.background_image}
                                rating={g.rating}
                                genres={g.genres}
                                key={g.id} />
                        </Link>
                    )
                } else {
                    return (
                        <div>
                            <Error />
                        </div>
                    )
                }
            })}

        </div>
    )
}