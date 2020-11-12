import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async(req, res) => {

    // Validar ...

    const { nombre, correo, mensaje } = req.body;

    const errores = []; //Definimos un arreglo

    if (nombre.trim() === '') { // Quita los espacios en blanco al principio y al final
        errores.push({ mensaje: 'El nombre está vacio' }); // Añadimos esto al arreglo usando push
    }

    if (correo.trim() === '') { // Quita los espacios en blanco al principio y al final
        errores.push({ mensaje: 'El correo está vacio' });
    }

    if (mensaje.trim() === '') { // Quita los espacios en blanco al principio y al final
        errores.push({ mensaje: 'El mensaje está vacio' });
    }

    if (errores.length > 0) { // si hay algún elemento dentro del arreglo entonces mostramos los errores

        // Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenarlo en la base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }


    }

}


export {
    guardarTestimonial
}