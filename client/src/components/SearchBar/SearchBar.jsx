import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame } from '../../actions';
//import './SearchBar.css'

export default function SearchBar (){
    
    const dispatch = useDispatch()
    const [ game, setGame ] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setGame(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameGame(game));
        setGame('');   
    }

    return (

        <div className="search">
            <input className='input'
            type='text'
            value= {game} 
            placeholder='           Cuál es tu juego?  ... '
            onChange={ e => handleInputChange(e) } />

            <button className='x'
            type='submit'
            onClick={ e => handleSubmit(e) }>Buscar</button>

        </div>
    )
}