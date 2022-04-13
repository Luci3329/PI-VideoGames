import React from 'react';
import { Link } from 'react-router-dom';
import imgLanding from './images/landing.jpg';
import './LandingPage.css'


export default function LandingPage() {
    return (
        <div class="container-fluid h-100">
            <div class="row w-100 align-items-center">

                <div class="text">

                    <h1>BIENVENIDOS A <strong>VIDEOGAMES APP</strong> </h1>
                    <h4>By Luci Machuca</h4>

                    <Link to='/home'>
                        <button class="bLanding" type="button">Ingresar</button></Link>
                </div>

            </div>
        </div>
    )
}
