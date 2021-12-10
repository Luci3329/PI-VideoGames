import { useState } from "react";

// para deshabilitar el botón de " CREAR VIDEOJUEGO" en caso de tener algún error

const [errors, setErrors] = useState({});

function validarForm(errors) {
    let validate = true;

    Object.values(errors).forEach(val => val.lenght > 0 && (validate = false));

    if (validate) {
        setErrors({
            disabled: true
        })
    }
}

// renderizamos entes de cerrar el form

return (

    <input disabled={errors.disabled} type='submit' value='submit' />
)


// VALIDACIONES DEL FORM

function validacion(input) {
    let errors = {};

    if (!input.name) errors.name = 'Se requiere un nombre';
    if (!input.description) errors.description = 'Se requiere descripción';
    if (!input.background_image) errors.background_image = 'Se requiere una imagen';
    if (!input.releaseDate) errors.releaseDate = 'Se requiere una Fecha de Lanzamiento';
    if (!input.rating) errors.rating = 'Se requiere Rating';
    if (!input.platforms) errors.platforms = 'Se requiere al menos una Plataforma';
    else if (!input.genres) errors.genres = 'Se requiere al menos un Género';

    return errors;
}

// utiliza el mismo estado local

// agrego el seteo en la función handleChange luego del setInput

setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
}));

// renderizo en el input (en caso de q suceda) abajo del onChange = ... handleChange />

return (

    <div>

        {errors.name && (
            <p className='error'>{errors.name}</p>
        )}

    </div>
)