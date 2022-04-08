import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames, listGenres, listPlatforms } from '../../actions';
import './NewGame.css';


function validacion(input) {

    let errors = {};
    let nameTest = /^[a-zA-ZA-y\s]{3,80}$/; // solo letras, de 3 a 80 caracteres

    if (!input.name) errors.name = 'Required Field'
    else if (!nameTest.test(input.name.trim())) errors.name = 'This Field Only Supports Letters ( 3 - 80 )'
    else if (!input.difficulty) errors.difficulty = 'Required Field'
    else if (input.difficulty < 1 || input.difficulty > 5) errors.difficulty = 'You must put a number between 1 and 5'
    else if (!input.pais) errors.pais = 'Required Field'
    return errors
}

export default function NewGame() {

    const dispatch = useDispatch()
    const history = useHistory()   // para redireccionar una vez creado el juego -> voy a /home

    const genres = useSelector(state => state.genres)
    //console.log(genres) // arreglo de strings
    const platforms = useSelector(state => state.platforms)
    //console.log(platforms)

    const [input, setInput] = useState({
        name: '',
        description: '',
        background_image: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: []

    })


    // acá guardo las cosas q el usuario va escribiendo -> estado local input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) // DINÁMICO -> va a ir tomando los valores de los inputs y los va modificando según lo escrito
    }

    function handleSelectGenres(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleSelectPlataforms(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }


    function handleSubmit(e) {
        e.preventDefault()
        //console.log(input);
        dispatch(postVideogames(input))
        alert('Juego Creado Exitosamente!')
        setInput({   // para q al terminar me deje todos los input en blanco nuevamente
            name: '',
            description: '',
            background_image: '',
            released: '',
            rating: 0,
            platforms: [],
            genres: []

        })
        history.push('/home') // useHistory -> me redirecciona al Home
    }

    function handleDeletePlatform(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== el)
        })
    }

    function handleDeleteGenre(el) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el)
        })
    }

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listGenres())
    }, [dispatch]);
    //lo saqué xq me traía problemas con la acción ListInfo y además rompía el SearchBar 

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listPlatforms())
    }, [dispatch]);

    return (

        <div className='principal'>

            <h2 className='crea'>Crea tu Videojuego!</h2><br/>

            <form enctype="multipart/form-data"  // para poder adjuntar archivos
                onSubmit={e => handleSubmit(e)}>

                <div class="form-floating mb-3">

                    <input type='text'
                        class="form-control"
                        id="floatingInput"
                        placeholder="Nombre"
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)} />
                    <label for="floatingInput">Nombre</label>

                    {/* <label>Nombre </label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)} /> */}
                </div>

                <div class="form-floating mb-3">

                    <input type='text'
                        class="form-control"
                        placeholder="Descripción"
                        id="floatingInput"
                        rows="3"
                        value={input.description}
                        name='description'
                        onChange={e => handleChange(e)} />
                    <label for="floatingInput">Descripcion</label>

                    {/*  <label>Descripcion </label>
                    <input
                        type='text'
                        value={input.description}
                        name='description'
                        onChange={e => handleChange(e)} /> */}
                </div>

                <div class="form-floating mb-3">
                    {/* <label>Imagen </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png" multiple
                        value={input.background_image}
                        name='background_image'
                        onChange={e => handleChange(e)} /> */}

                    <input type='text'
                        class="form-control"
                        id="floatingInput"
                        placeholder="Imagen"
                        value={input.background_image}
                        name='background_image'
                        onChange={e => handleChange(e)} />
                    <label for="floatingInput">Imagen</label>

                </div>

                {/* <div>
                    <label>Fecha de Lanzamiento </label>
                    <input
                        type="date"
                        placeholder='aaaa - mm - dd'
                        autoComplete="off"
                        id="start"
                        min="2022-04-08"
                        max="2025-12-31"
                        value={input.released}
                        name='trip-start"'
                        onChange={e => handleChange(e)} />
                </div> */}

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fecha de Lanzamiento</span>
                    <input type="date"
                        class="form-control"
                        aria-label="Fecha de Lanzamiento"
                        placeholder='aaaa - mm - dd'
                        id="start"
                        min="2022-04-08"
                        max="2025-12-31"
                        value={input.released}
                        name='trip-start'
                        aria-describedby="basic-addon1"
                        onChange={e => handleChange(e)} />

                </div>

                {/* <div>
                    <input type='number'
                        class="form-control"
                        id="floatingInput"
                        placeholder="Rating"
                        step="0.1"
                        min='0.1'
                        max='5'
                        value={input.rating}
                        name='rating'
                        onChange={e => handleChange(e)} />
                    <label for="floatingInput">Rating</label>
                </div> */}

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Rating</span>
                    <input type='number'
                        class="form-control"
                        aria-label="Rating"
                        placeholder="Rating"
                        step="0.1"
                        min='0.1'
                        max='5'
                        value={input.rating}
                        name='rating'
                        aria-describedby="basic-addon1"
                        onChange={e => handleChange(e)} />

                </div>

                <div>
                    {/* <label>Plataforma/s </label>
                    <select onChange={(e) => handleSelectPlataforms(e)}>


                        {
                            platforms?.map((platform) => {
                                return <option value={platform} key={platform} name="platforms"> {platform} </option>
                            })}
                    </select> */}

                    <label for="exampleDataList" class="form-label"></label>
                    <input class="form-control"
                        list="datalistOptions"
                        id="exampleDataList"
                        placeholder="Seleccione Plataforma/s"
                        onChange={(e) => handleSelectPlataforms(e)} />

                    <datalist id="datalistOptions">
                        {
                            platforms?.map((platform) => {
                                return <option value={platform} key={platform} name="platforms"> {platform} </option>
                            })}
                    </datalist>

                </div>



                <div>
                    {/* <label>Género/s </label>
                    <select onChange={(e) => handleSelectGenres(e)}>

                        {
                            genres?.map((genre) => {
                                return <option value={genre} key={genre}> {genre} </option>
                            })}
                    </select> */}

                    <label for="exampleDataList" class="form-label"></label>
                    <input class="form-control"
                        list="datalistOptions"
                        id="exampleDataList"
                        placeholder="Seleccione Género/s"
                        onChange={(e) => handleSelectGenres(e)} />
                    <datalist id="datalistOptions">
                        {
                            genres?.map((genre) => {
                                return <option value={genre} key={genre}> {genre} </option>
                            })}
                    </datalist>


                </div>

                <br/><br/>

                <div>
                    <button className='boton' type='submit'>Crear Juego</button><br/><br/>
                </div>

                <div>
                    <Link to='/home'> <button className='boton'>Volver</button></Link><br/>
                </div>

            </form>



            {input.genres &&
                input.genres.map(el => {
                    return (
                        <div>
                            <h5 key={el}>{el}</h5>
                            <button className='boton X'
                                onClick={() => handleDeleteGenre(el)} > X </button>
                        </div>
                    )
                })}

            {input.platforms &&
                input.platforms.map(el => {
                    return (
                        <div>
                            <h5 key={el}>{el}</h5>
                            <button className='boton X'
                                onClick={() => handleDeletePlatform(el)} > X </button>
                        </div>
                    )
                })}


        </div>



    )


}