const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

// Ruta que ya tenías (Listar todo)
router.get('/', (req, res) => peliculaController.listarTodo(req, res));

// NUEVA RUTA: Buscar por ID (Ej. /api/peliculas/2)
router.get('/:id', (req, res) => peliculaController.buscarPorId(req, res));

// NUEVA RUTA: Agregar elemento (POST)
router.post('/', (req, res) => peliculaController.agregar(req, res));

// NUEVA RUTA: Modificar elemento (PUT)
router.put('/:id', (req, res) => peliculaController.editar(req, res));

// NUEVA RUTA: Eliminar elemento (DELETE)
router.delete('/:id', (req, res) => peliculaController.eliminar(req, res));

module.exports = router;