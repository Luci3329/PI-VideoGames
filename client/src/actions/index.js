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


export function getNameGame(game){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/videogames?name='+game, {});
            return dispatch({
                type : 'GET_NAME_GAME',
                payload : json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postVideogames(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/videogame', payload);
        return response;
    }
}

export function listInfo(){
    return async function (dispatch) {
        //console.log("Get platforms/genre pedido");
        var p = await axios.get('http://localhost:3001', {})
          return dispatch({
            type: "LIST_INFO",
            payload: p.data,
          });
        };
      }; // me trae { genres : [ ... ], platforms : [ ... ]}
    

