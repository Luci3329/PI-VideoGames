
// La función del REDUCER es manipular el state y su contenido 
// Siempre retorna un nuevo state y le avisa del cambio a los componentes

const initialState = {
    videogames: [],  // estado q renderizo
    allVideogames: [],  // estado q siempre tiene TODO -> para q no me filtre sobre lo filtrado
    genres: [],
    filterGenres: [],
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

        case 'LIST_GENRES':

            //const arrGenres = state.genres
            //const genresFilter = action.payload === 'All' ? arrGenres :
            //arrGenres.filter(el => el.name === action.payload)

            const genresFilter = action.payload.map(el => el.name)


            return {
                ...state,
                genres: genresFilter
            }


        case 'GENRES_FILTER':
            //const genres = state.genres
            const allGames = state.allVideogames
            const gamesFiltered = allGames.map(el => el.genres.map(g => g === action.payload))

            return {
                ...state,
                filterGenres: gamesFiltered
            }

        default:
            return state;
    }
}

export default rootReducer;