class PeliculaController {
    constructor() {
        this.peliculas = [
            { id: 1, titulo: "Inception", director: "Christopher Nolan", año: 2010 },
            { id: 2, titulo: "Interstellar", director: "Christopher Nolan", año: 2014 },
            { id: 3, titulo: "The Matrix", director: "Lana Wachowski", año: 1999 }
        ];
    }

    listarTodo(req, res) {
        res.json(this.peliculas);
    }

    // NUEVO: Buscar por ID
    buscarPorId(req, res) {
        // Obtenemos el ID de la URL y lo convertimos a número
        const id = parseInt(req.params.id); 
        
        // Buscamos en el array usando la función find() de JavaScript
        const pelicula = this.peliculas.find(p => p.id === id);

        if (pelicula) {
            res.json(pelicula); // Si existe, la devolvemos
        } else {
            res.status(404).json({ mensaje: "Película no encontrada" }); // Error 404 si no existe
        }
    }

    // NUEVO: Agregar una película (POST)
    agregar(req, res) {
        const datosRecibidos = req.body; // Aquí viene la info desde el cliente

        // Generamos un ID automático (el ID de la última película + 1)
        const nuevoId = this.peliculas.length > 0 ? this.peliculas[this.peliculas.length - 1].id + 1 : 1;
        
        // Creamos el nuevo objeto combinando el ID y los datos recibidos
        const nuevaPelicula = { id: nuevoId, ...datosRecibidos };

        // Lo agregamos a nuestro array en memoria
        this.peliculas.push(nuevaPelicula);

        // Respondemos con status 201 (Creado)
        res.status(201).json({ 
            mensaje: "Película agregada con éxito", 
            pelicula: nuevaPelicula 
        });
    }
    // NUEVO: Modificar una película (PUT)
    editar(req, res) {
        const id = parseInt(req.params.id);
        const datosActualizados = req.body;
        
        // Buscamos el índice (la posición) de la película en el array
        const index = this.peliculas.findIndex(p => p.id === id);

        if (index !== -1) {
            // Si existe, reemplazamos sus datos pero conservamos su ID original
            this.peliculas[index] = { id: id, ...datosActualizados };
            res.json({ 
                mensaje: "Película actualizada con éxito", 
                pelicula: this.peliculas[index] 
            });
        } else {
            res.status(404).json({ mensaje: "Película no encontrada para editar" });
        }
    }

    // NUEVO: Eliminar una película (DELETE)
    eliminar(req, res) {
        const id = parseInt(req.params.id);
        const index = this.peliculas.findIndex(p => p.id === id);

        if (index !== -1) {
            // splice corta elementos de un array. Aquí quitamos 1 elemento en la posición 'index'
            this.peliculas.splice(index, 1);
            res.json({ mensaje: "Película eliminada correctamente" });
        } else {
            res.status(404).json({ mensaje: "Película no encontrada para eliminar" });
        }
    }
    // NUEVO: Método para renderizar la vista EJS
    vistaPeliculas(req, res) {
        // res.render pide dos cosas: el nombre del archivo EJS (sin la extensión) y los datos que le vas a pasar
        res.render('peliculas', { 
            titulo: 'Cartelera de Cine', 
            peliculas: this.peliculas 
        });
    }
    // NUEVO: Mostrar el formulario web
    vistaNuevaPelicula(req, res) {
        res.render('nueva-pelicula');
    }

    // NUEVO: Procesar el formulario web y redireccionar
    agregarDesdeWeb(req, res) {
        const datosRecibidos = req.body; 

        // Misma lógica de generación de ID que hicimos en la API
        const nuevoId = this.peliculas.length > 0 ? this.peliculas[this.peliculas.length - 1].id + 1 : 1;
        
        // Convertimos el año a número porque los formularios HTML envían todo como texto (String)
        const nuevaPelicula = { 
            id: nuevoId, 
            titulo: datosRecibidos.titulo,
            director: datosRecibidos.director,
            año: parseInt(datosRecibidos.año)
        };

        this.peliculas.push(nuevaPelicula);

        // En lugar de responder con JSON, redireccionamos a la página de la cartelera
        res.redirect('/cartelera');
    }
    // NUEVO: Mostrar detalles de una película en la web
    vistaDetalle(req, res) {
        const id = parseInt(req.params.id);
        const pelicula = this.peliculas.find(p => p.id === id);

        if (pelicula) {
            res.render('detalle-pelicula', { pelicula: pelicula });
        } else {
            res.send("<h1>Error: Película no encontrada</h1><a href='/cartelera'>Volver</a>");
        }
    }
}

module.exports = new PeliculaController();