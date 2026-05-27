var express = require('express');
var router = express.Router();

const peliculaController = require('../controllers/peliculaController');
const funcionController = require('../controllers/funcionController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi Proyecto de Cine' });
});

router.get('/cartelera', (req, res) => peliculaController.vistaPeliculas(req, res));

// NUEVA RUTA WEB: Mostrar el formulario (GET)
router.get('/nueva-pelicula', (req, res) => peliculaController.vistaNuevaPelicula(req, res));

// NUEVA RUTA WEB: Recibir los datos del formulario (POST)
router.post('/agregar-pelicula', (req, res) => peliculaController.agregarDesdeWeb(req, res));

// NUEVA RUTA WEB: Ver detalles de una película (GET)
router.get('/pelicula/:id', (req, res) => peliculaController.vistaDetalle(req, res));

router.get('/ver-funciones', (req, res) => funcionController.vistaFunciones(req, res));

module.exports = router;