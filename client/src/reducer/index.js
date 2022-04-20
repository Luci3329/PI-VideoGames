// La función del REDUCER es manipular el state y su contenido 
// Siempre retorna un nuevo state y le avisa del cambio a los componentes

const initialState = {
    videogames: [],  // estado q renderizo
    allVideogames: [],  // estado q siempre tiene TODO -> para q no me filtre sobre lo filtrado
    genres: [],
    genresFilter: [],
    platforms: [],
    detail: []
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
            const createdFilter = action.payload === '2' ?
                allVideogames.filter(el => el.createdInDB) :
                allVideogames.filter(el => !el.createdInDB)

            return {
                ...state,
                videogames: action.payload === '1' ? state.allVideogames : createdFilter
            }

        case 'ORDER_BY_GAME':

            let gameArr = action.payload === 'asc' ?
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
                videogames: gameArr
            }

        case 'ORDER_BY_RATING':

            let ratingArr = [];
            if (action.payload === "asc") {
                ratingArr = state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                });
            } else if (action.payload === "desc") {
                ratingArr = state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 0;
                });
            } else {
                ratingArr = state.videogames;
            }
            return {
                ...state,
                videogames: ratingArr
            };


        case 'LIST_GENRES': // me traigo todo de mi ruta getInfo
            //const allGenres = action.payload;//.map(genre => genre.name); 
            //const allPlatforms = action.payload.platforms;
            //const genresAll = action.payload.map(g => g.name)

            return {
                ...state,
                genres: action.payload.genres
            }

        case 'FILTER_BY_GENRES': // el valor del select es lo q le llega a mi acción x payload
            //const videogames = state.videogames
            const genresFilter = action.payload === '4' ? state.allVideogames : state.allVideogames.filter(el => el.genres.includes(action.payload))
            return {
                ...state,
                videogames: genresFilter
            }

        //const allGs = state.allGenres // si recibo 'All' muestro todos, si marcan alguno -> filtro ese alguno
        //const genresFilter = action.payload === 'All' ? allGs : allGs.filter(el => el.state === action.payload)
        //const genreSS = action.payload.genre.map(genre=>genre.name);

        case 'LIST_PLATFORMS':
            return {
                ...state,
                platforms: action.payload.platforms
            }

        case 'GET_NAME_GAME':
            return {
                ...state,
                videogames: action.payload
            }

        case 'POST_VIDEOGAMES':
            return {
                ...state   // no hacemos nada aquí xq creamos en una nueva ruta
            }

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }


        default:
            return state;
    }
}

export default rootReducer;

