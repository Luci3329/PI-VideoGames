import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage() {
    return (
        
            <div class="landing d-flex align-items-center justify-content-center text-center">

                <div class="col-12 text-center text">

                    <h1>BIENVENIDOS A <strong>VIDEOGAMES APP</strong> </h1>
                    <h4>By Luci Machuca</h4>

                    <Link to='/home'>
                        <button class="bLanding" type="button">Ingresar</button></Link>
                </div>

            </div>
        
    )
}
