import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame } from '../../actions';

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

        <div>
            <input
            type='text'
            placeholder='Buscar...'
            onChange={ e => handleInputChange(e) } />

            <button 
            type='submit'
            onClick={ e => handleSubmit(e) }>Buscar</button>

        </div>
    )
}