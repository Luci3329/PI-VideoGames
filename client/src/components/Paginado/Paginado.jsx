import React from "react";
import './Paginado.css';

//                             me los traigo como propiedades del otro componente (Home)
export default function Paginado({gamesPorPag, allVideogames, paginado}){

    const pagNum = []  // [ 0, 1, 2, 3, 4, 5, 6 ]
    
                                //    100       /     15  =   7
    for(let i = 1; i <= Math.ceil(allVideogames / gamesPorPag); i++){
        pagNum.push(i) // +1 para q comience la paginación en 1
    }

    return(

        <nav>
            <ul className= 'paginado'>
                { pagNum && 
                    pagNum.map(number => (
                        <li className= 'number' key={number}>
                        <p onClick={() => paginado(number)}>{number}</p>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}