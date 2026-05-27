class PeliculaController {
    constructor() {
        this.peliculas = [
            { id: 1, titulo: "Yo antes de ti", director: "Thea Sharrock", año: 2016 },
            { id: 2, titulo: "Diario de una pasión", director: "Nick Cassavetes", año: 2004 },
            { id: 3, titulo: "Violet y Finch", director: "Brett Haley", año: 2020 }
        ];
    }

    listarTodo(req, res) {
        res.json(this.peliculas);
    }

    // Buscar por ID
    buscarPorId(req, res) {
        const id = parseInt(req.params.id); 
        
        const pelicula = this.peliculas.find(p => p.id === id);

        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({ mensaje: "Película no encontrada" });
        }
    }

    // Agregar una película
    agregar(req, res) {
        const datosRecibidos = req.body;

        const nuevoId = this.peliculas.length > 0 ? this.peliculas[this.peliculas.length - 1].id + 1 : 1;
        
        const nuevaPelicula = { id: nuevoId, ...datosRecibidos };

        this.peliculas.push(nuevaPelicula);

        res.status(201).json({ 
            mensaje: "Película agregada con éxito", 
            pelicula: nuevaPelicula 
        });
    }
    // Modificar una película
    editar(req, res) {
        const id = parseInt(req.params.id);
        const datosActualizados = req.body;
        
        const index = this.peliculas.findIndex(p => p.id === id);

        if (index !== -1) {
            this.peliculas[index] = { id: id, ...datosActualizados };
            res.json({ 
                mensaje: "Película actualizada con éxito", 
                pelicula: this.peliculas[index] 
            });
        } else {
            res.status(404).json({ mensaje: "Película no encontrada para editar" });
        }
    }

    // Eliminar una película
    eliminar(req, res) {
        const id = parseInt(req.params.id);
        const index = this.peliculas.findIndex(p => p.id === id);

        if (index !== -1) {
            this.peliculas.splice(index, 1);
            res.json({ mensaje: "Película eliminada correctamente" });
        } else {
            res.status(404).json({ mensaje: "Película no encontrada para eliminar" });
        }
    }
    // Método para renderizar la vista EJS
    vistaPeliculas(req, res) {
        res.render('peliculas', { 
            titulo: 'Cartelera de Cine', 
            peliculas: this.peliculas 
        });
    }
    // Mostrar el formulario web
    vistaNuevaPelicula(req, res) {
        res.render('nueva-pelicula');
    }

    // Procesar el formulario web y redireccionar
    agregarDesdeWeb(req, res) {
        const datosRecibidos = req.body; 

        const nuevoId = this.peliculas.length > 0 ? this.peliculas[this.peliculas.length - 1].id + 1 : 1;
        
        const nuevaPelicula = { 
            id: nuevoId, 
            titulo: datosRecibidos.titulo,
            director: datosRecibidos.director,
            año: parseInt(datosRecibidos.año)
        };

        this.peliculas.push(nuevaPelicula);

        res.redirect('/cartelera');
    }
    // Mostrar detalles de una película en la web
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