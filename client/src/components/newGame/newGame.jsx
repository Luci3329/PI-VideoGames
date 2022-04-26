import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames, listGenres, listPlatforms } from '../../actions';
import './NewGame.css';


function validacion(input) {
    let errors = {};

    if (!input.name) errors.name = 'Se requiere un nombre';
    if (!input.description) errors.description = 'Se requiere descripción';
    if (input.rating < 0.1 || input.rating > 5) errors.rating = 'Debes seleccionar un número ente 0.1 y 5';
    if (!input.platforms) errors.platforms = 'Se requiere al menos una Plataforma';
    else if (!input.genres) errors.genres = 'Se requiere al menos un Género';

    return errors;
}

/* // ---------------- PARA DESHABILITAR EL BOTÓN "CREAR VIDEOJUEGO" SI TENEMOS ALGÚN ERROR -------
function validarForm(errors) {
    let validate = true;

    Object.values(errors).forEach(val => val.lenght > 0 && (validate = false));

    if (validate) {
        setErrors({
            disabled: true
        })
    }
} */

export default function NewGame() {

    const dispatch = useDispatch()
    const history = useHistory()   // para redireccionar una vez creado el juego -> voy a /home

    const genres = useSelector(state => state.genres)
    //console.log(genres) // arreglo de strings
    const platforms = useSelector(state => state.platforms)

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        description: '',
        background_image: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: []

    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) // DINÁMICO -> va a ir tomando los valores de los inputs y los va modificando según lo escrito
        setErrors(validacion({
            ...input,
            [e.target.name]: e.target.value
        }));
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
        e.preventDefault();
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

    // ---------------- PARA ESTABLECER COMO MÍNIMO LA FECHA ACTUAL EN EL CALENDARIO
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1; // xq Enero es 0

    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2);

    const hoy = `${año}-${mes}-${dia}`
    // ----------------------------------------------------------------------------------

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listGenres())
    }, [dispatch]);
    //lo saqué xq me traía problemas con la acción ListInfo y además rompía el SearchBar 

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listPlatforms())
    }, [dispatch]);

    return (

        <div className='principal'>

            <h2 className='crea'>Crea tu Videojuego!</h2><br />

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

                    {errors.name && (
                        <p class="error">{errors.name}</p>
                    )}
                    <label for="floatingInput">Nombre</label>
                </div>

                <div class="form-floating mb-3">

                    <textarea class="form-control"
                        placeholder="Descripción"
                        id="floatingTextarea2"
                        value={input.description}
                        name='description'
                        style={{ height: "100px" }}
                        onChange={e => handleChange(e)} />

                    {errors.description && (
                        <p class="error">{errors.description}</p>
                    )}
                    <label for="floatingTextarea2">Descripcion</label>
                </div>

                <div class="form-floating mb-3">
                    <input type='text'
                        class="form-control"
                        id="floatingInput"
                        placeholder="Imagen"
                        value={input.background_image}
                        name='background_image'
                        onChange={e => handleChange(e)} />
                    <label for="floatingInput">Imagen</label>

                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fecha de Lanzamiento</span>
                    <input type="date"
                        class="form-control"
                        aria-label="Fecha de Lanzamiento"
                        placeholder='aaaa - mm - dd'
                        id="released"
                        min={hoy}
                        max="2025-12-31"
                        value={input.released}
                        name='released'
                        aria-describedby="basic-addon1"
                        onChange={e => handleChange(e)} />

                </div>

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

                    {errors.rating && (
                        <p class="error">{errors.rating}</p>
                    )}

                </div>


                <div class="form-floating mb-3">
                    <select class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => handleSelectPlataforms(e)}>

                        {
                            platforms?.map((platform) => {
                                return <option value={platform} key={platform} name="platforms"> {platform} </option>
                            })}

                        {errors.platforms && (
                            <p class="error">{errors.platforms}</p>
                        )}

                    </select>
                    <label class="option" for="floatingSelect">Seleccione Plataforma/s</label>
                </div>


                <div class="form-floating mb-3">
                    <select class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => handleSelectGenres(e)} >
                        {
                            genres?.map((genre) => {
                                return <option value={genre} key={genre}> {genre} </option>
                            })
                        }

                        {errors.genres && (
                            <p class="error">{errors.genres}</p>
                        )}

                    </select>
                    <label class="option" for="floatingSelect">Seleccione Género/s</label>
                </div>


                <div class="row d-flex justify-content-center">
                    {input.genres &&
                        input.genres.map(el => {
                            return (
                                <div class="col-sm-3">
                                    <div class="luci">
                                        <h5 class="ventana" key={el}>{el}</h5>
                                        <button type="button"
                                            class="btn cerrar"
                                            onClick={() => handleDeleteGenre(el)} >Eliminar</button>

                                    </div>
                                </div>
                            )
                        })}



                    <div class="row d-flex justify-content-center">

                        {input.platforms &&
                            input.platforms.map(el => {
                                return (
                                    <div class="col-sm-3">
                                        <div class="luci">
                                            <h5 class="ventana" key={el}>{el}</h5>
                                            <button type="button"
                                                class="btn cerrar"
                                                onClick={() => handleDeletePlatform(el)}>Eliminar</button>

                                        </div>
                                    </div>
                                )
                            })}

                    </div>

                </div>

                <br /><br />

                <div class="row">
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <Link to='/home'> <a class="nav-link volver" href="#">Volver</a></Link><br />

                    </div>

                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-light w-auto p-2" 
                        disabled={errors.name || errors.description || errors.rating || errors.platforms || errors.genres}
                        type='submit'>Crear Juego</button><br /><br />
                    </div>
                </div>

            </form>

        </div >

    )

}