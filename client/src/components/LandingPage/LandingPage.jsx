import React from 'react';
import { Link } from 'react-router-dom';
import img from './images/Landing.jpeg'
import './LandingPage.css'


export default function LandingPage() {
    return (
        <div className='container'>
         
         <img className='fotop' src={img} alt="hola" />

         
 

            <div className='boton'>
                
                <Link to='/home'>
                    <button className="bp">Home</button>
                </Link>
            </div>

            


        </div>
    )
}
    