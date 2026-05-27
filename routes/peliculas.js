const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

router.get('/', (req, res) => peliculaController.listarTodo(req, res));

router.get('/:id', (req, res) => peliculaController.buscarPorId(req, res));

router.post('/', (req, res) => peliculaController.agregar(req, res));

router.put('/:id', (req, res) => peliculaController.editar(req, res));

router.delete('/:id', (req, res) => peliculaController.eliminar(req, res));

module.exports = router;