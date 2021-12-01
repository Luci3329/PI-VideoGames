// ****************   ACTIONS

export function listGenres() {
    return async function () {
        var g = await axios.get('http://localhost:3001/genres', {});
        return {
            type: 'LIST_GENRES',
            payload: g.data   // [ {} {} {} ... ]     

        } // con ésta acción me traje la lista de géneros para mostrar en las <option>

    }
}

// g.data.filter(game => g.data.game.genres === value)
// export function filterByGenre(value){

return async function (dispatch) {
    var g = await axios.get('http://localhost:3001/videogames', {}); // [ {} {} {} ... ]
    return dispatch({
        type: 'FILTER_BY_GENRE',
        payload: g.data

    })
}


//  ************  REDUCER

const initialState = {
    videogames: [],
    genres: [],     // estado q renderizo
    filterGenres: [],  // estado q siempre tiene TODO -> para q no me filtre sobre lo filtrado
    platforms: []
}

function rootReducer(state = initialState, action) {   // acá van a ir todas mis acciones

    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }


        case 'FILTER_BY_GENRE':
            //const allGs = state.allGenres // si recibo 'All' muestro todos, si marcan alguno -> filtro ese alguno
            //const genresFilter = action.payload === 'All' ? allGs : allGs.filter(el => el.state === action.payload)
            //const genreSS = action.payload.genre.map(genre=>genre.name);
            return {
                ...state,

                filterGenres: [...state.filterGenres, action.payload]
            }
        // concateno el estado inicial con el payload -> género q cliqueó el usuario

        case 'LIST_GENRES':

            const genres = action.payload.map(genre => genre.name); // payload me trae el /genres [ {} {} {} ]
            const platforms = action.payload.platforms;
            console.log(genres)
            return {
                ...state,
                genres: genres,
                platforms: platforms
            }

        default:
            return state;
    }
}

export default rootReducer;



// ****************  HOME

const genresAll = useSelector(state => state.genres)
//console.log(genresAll)
const genresFilter = useSelector(state => state.filterGenres)
//console.log(genresFilter)

//const [currentPage, setCurrentPage] = useState(0);
const [filtered, setFilters] = useState('');

useEffect(() => {   // sin esto no pasa nada
    setFilters(listGenres())
}, [])


function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
}

/*  function handleFilterByGenre(e) {
     dispatch(filterByGenre(e))
 } */

function handleFilterClick(e) {
    if (e.target.attributes[1].value === "genre") {
        genresFilter.includes(e.target.value) === true
            ? alert("Genero ya seleccionado")
            : dispatch(filterByGenre(e.target.value))
    }
}


/*  const handleSelect = (e) => {
     filterByGenre(e.target.value)
 } */

/*  function handleChange(e) {
     
     setFilters(e.target.value)
 } */

<select
    id="genres"
    value={genresAll}
    size="3"
    className='luci'
>
    {genresAll &&
        genresAll.map((genre) => (
            <option value={genre.name} onClick={() => dispatch(listGenres())} name="genre">
                {genre.name}
            </option>
        ))}
</select>



 /* case 'GENRES_FILTER':
           //const genres = state.genres
           const allGames = state.allVideogames
           const gamesFiltered = allGames.filter( el => el.genres === action.payload)

               return{
                  ...state,
                  filterGenres : gamesFiltered
           }  */