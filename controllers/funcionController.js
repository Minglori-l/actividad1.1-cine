class FuncionController {
    constructor() {
        this.funciones = [
            { id: 1, peliculaId: 1, sala: "A", fecha: "2026-06-01" },
            { id: 2, peliculaId: 2, sala: "B", fecha: "2026-06-02" },
            { id: 3, peliculaId: 3, sala: "C", fecha: "2026-06-03" },
            { id: 4, peliculaId: 1, sala: "A", fecha: "2026-06-04" },
            { id: 5, peliculaId: 2, sala: "B", fecha: "2026-06-05" },
            { id: 6, peliculaId: 3, sala: "C", fecha: "2026-06-06" }
        ];
    }

    // REQUISITO: Mostrar los últimos 5 elementos
    ultimasCinco(req, res) {
        // .slice(-5) toma los últimos 5 elementos del array
        const ultimas = this.funciones.slice(-5);
        res.json(ultimas);
    }

    // REQUISITO: Filtrar por rango de fechas
    // Usaremos "query params" en la URL, ej: /api/funciones/fechas?inicio=2026-06-02&fin=2026-06-05
    filtrarPorFecha(req, res) {
        const fechaInicio = req.query.inicio;
        const fechaFin = req.query.fin;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: "Debes enviar las fechas 'inicio' y 'fin' en la URL" });
        }

        const funcionesFiltradas = this.funciones.filter(funcion => {
            // Comparamos los strings de las fechas (formato YYYY-MM-DD permite comparacion directa)
            return funcion.fecha >= fechaInicio && funcion.fecha <= fechaFin;
        });

        res.json(funcionesFiltradas);
    }
    // NUEVO: Eliminar relación entre entidades (Función y Película)
    desvincularPelicula(req, res) {
        // Obtenemos el ID de la función que viene en la URL
        const idFuncion = parseInt(req.params.id);
        
        // Buscamos la función en el array
        const index = this.funciones.findIndex(f => f.id === idFuncion);

        if (index !== -1) {
            // "Rompemos" la relación seteando el peliculaId a null
            this.funciones[index].peliculaId = null;
            
            res.json({ 
                mensaje: "Relación eliminada: La función ya no tiene una película asignada.", 
                funcion: this.funciones[index] 
            });
        } else {
            res.status(404).json({ mensaje: "Función no encontrada" });
        }
    }
    // NUEVO: Renderizar la lista de funciones en HTML
    vistaFunciones(req, res) {
        res.render('funciones', { funciones: this.funciones });
    }
}

module.exports = new FuncionController();