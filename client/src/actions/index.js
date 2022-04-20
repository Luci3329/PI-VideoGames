import axios from 'axios';

// store -> contiene el estado de la aplicación
// dispatch -> permite q se modifique el store (se actualiza el estado -> acción)
// la función dispatch es la encargada de enviar las acciones al store.
// las acciones se disparan a través de EVENTOS
// disptach -> acción -> reduce (nuevo store)
// payload -> información para poder modificar el store





export function getVideogames() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/videogames', {});
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

// ORDEN ALFABÉTICO POR JUEGO
export function orderByGame(payload) {
    return {
        type: 'ORDER_BY_GAME',
        payload
    }
}

// ORDEN ALFABÉTICO POR RATING
export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function listGenres() {
    return async function (dispatch) {
        //console.log("Get platforms/genre pedido");
        var p = await axios.get('http://localhost:3001/info', {})
        return dispatch({
            type: "LIST_GENRES",
            payload: p.data
        });
    };
}; // me trae { genres : [ ... ], platforms : [ ... ]}

export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}


export function listPlatforms() {
    return async function (dispatch) {
        //console.log("Get platforms/genre pedido");
        var p = await axios.get('http://localhost:3001/info', {})
        return dispatch({
            type: "LIST_PLATFORMS",
            payload: p.data
        });
    };
};


export function getNameGame(game) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/videogames?name=' + game, {});
            return dispatch({
                type: 'GET_NAME_GAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postVideogames(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogame', payload);
        return response;
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/videogame/' + id );
            return dispatch({                        
                type: "GET_DETAIL",
                payload: json.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}







