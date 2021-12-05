// La función del REDUCER es manipular el state y su contenido 
// Siempre retorna un nuevo state y le avisa del cambio a los componentes

const initialState = {
    videogames: [],  // estado q renderizo
    allVideogames: [],  // estado q siempre tiene TODO -> para q no me filtre sobre lo filtrado
    genres: [],
    
    platforms: []
}

function rootReducer(state = initialState, action) {   // acá van a ir todas mis acciones

    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }

        case 'FILTER_CREATED':

            const allVideogames = state.allVideogames
            const createdFilter = action.payload === 'Created' ?
                allVideogames.filter(el => el.createdInDB) :
                allVideogames.filter(el => !el.createdInDB)

            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }

        case 'ORDER_BY_GAME':

            let sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })

            return {
                ...state,
                videogames: sortedArr
            }

       
        case 'GET_NAME_GAME':
            return {
                ...state,
                videogames: action.payload
            }
 

        case 'LIST_INFO': // me traigo todo de mi ruta getInfo
            const allGenres = action.payload.genres;//.map(genre => genre.name);
            const allPlatforms = action.payload.platforms;
            return {
                ...state,
                genres: allGenres,
                platforms: allPlatforms
            }

        case 'POST_VIDEOGAMES' :
            return {
                ...state   // no hacemos nada aquí xq creamos en una nueva ruta
            }    
            
        default:
            return state;
    }
}

export default rootReducer;

