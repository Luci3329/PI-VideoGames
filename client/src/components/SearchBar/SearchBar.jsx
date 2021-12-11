import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame } from '../../actions';
import './SearchBar.css'

export default function SearchBar (){
    
    const dispatch = useDispatch()
    const [ game, setGame ] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setGame(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameGame(game))
        setGame('');   // NO FUNCIONA, no me lo borra cuando termina de buscar -> VER!!!
    }

    return (

        <div className="bp">
            <input className='bp'
            type='text'
            placeholder='Tu Juego...'
            onChange={ e => handleInputChange(e) } />

            <button className='bp'
            type='submit'
            onClick={ e => handleSubmit(e) }>Buscar</button>

        </div>
    )
}