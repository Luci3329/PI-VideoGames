import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage() {
    return (
        
            <div class="landing d-flex flex-column justify-content-center align-content-center flex-wrap">

                <div class="text p-2"><h2>Bienvenidos a </h2></div>
                <div class="text p-2"><h1><strong>VIDEOGAMES APP</strong></h1></div>
                <div class="text p-2"><h4>By Luci Machuca</h4></div>
                <div class="div p-2"><Link to='/home'>
                        <button class="bLanding" type="button">Ingresar</button></Link></div>


            </div>
        
    )
}
