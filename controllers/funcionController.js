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

    // Mostrar los últimos 5 elementos
    ultimasCinco(req, res) {
        const ultimas = this.funciones.slice(-5);
        res.json(ultimas);
    }

    //Filtrar por rango de fechas
    filtrarPorFecha(req, res) {
        const fechaInicio = req.query.inicio;
        const fechaFin = req.query.fin;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ mensaje: "Debes enviar las fechas 'inicio' y 'fin' en la URL" });
        }

        const funcionesFiltradas = this.funciones.filter(funcion => {
            return funcion.fecha >= fechaInicio && funcion.fecha <= fechaFin;
        });

        res.json(funcionesFiltradas);
    }
    // Eliminar relación entre entidades (Función y Película)
    desvincularPelicula(req, res) {
        const idFuncion = parseInt(req.params.id);
        
        const index = this.funciones.findIndex(f => f.id === idFuncion);

        if (index !== -1) {
            this.funciones[index].peliculaId = null;
            
            res.json({ 
                mensaje: "Relación eliminada: La función ya no tiene una película asignada.", 
                funcion: this.funciones[index] 
            });
        } else {
            res.status(404).json({ mensaje: "Función no encontrada" });
        }
    }
    // Renderizar la lista de funciones en HTML
    vistaFunciones(req, res) {
        res.render('funciones', { funciones: this.funciones });
    }
}

module.exports = new FuncionController();