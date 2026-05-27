const express = require('express');
const router = express.Router();
const funcionController = require('../controllers/funcionController');

// Ruta para las últimas 5 (GET /api/funciones/ultimas)
router.get('/ultimas', (req, res) => funcionController.ultimasCinco(req, res));

// Ruta para filtrar por fechas (GET /api/funciones/fechas?inicio=...&fin=...)
router.get('/fechas', (req, res) => funcionController.filtrarPorFecha(req, res));

// Romper relación (PUT /api/funciones/:id/desvincular-pelicula)
router.put('/:id/desvincular-pelicula', (req, res) => funcionController.desvincularPelicula(req, res));

module.exports = router;