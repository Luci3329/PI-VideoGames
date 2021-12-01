//require ('dotenv').config();
//const { API_KEY } = process.env;
import axios from 'axios';

// store -> contiene el estado de la aplicación
// dispatch -> permite q se modifique el store (se actualiza el estado -> acción)
// la función dispatch es la encargada de enviar las acciones al store.
// las acciones se disparan a través de EVENTOS
// disptach -> acción -> reduce (nuevo store)
// payload -> información para poder modificar el store

export function getVideogames(){
    return async function (dispatch){
        var json = await axios.get( 'http://localhost:3001/videogames', {}); 
        return dispatch ({
            type : 'GET_VIDEOGAMES',
            payload : json.data
        })
    }
}

export function filterCreated (payload){
    return {
        type : 'FILTER_CREATED' ,
        payload
    }
}

export function orderByGame (payload){
    return {
        type : 'ORDER_BY_GAME' ,
        payload
    }
}

export function listGenres() {
    return async function (dispatch) {
        var g = await axios.get('http://localhost:3001/genres', {});
        return dispatch ({
            type: 'LIST_GENRES',
            payload: g.data   // [ {} {} {} ... ]     

        }) // con ésta acción me traje la lista de géneros para mostrar en las <option>

    }
}

export function genresFilter (payload){
    return {
        type : 'GENRES_FILTER' ,
        payload
    }
}
    

   

