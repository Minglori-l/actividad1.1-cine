var express = require('express');
var router = express.Router();

const peliculaController = require('../controllers/peliculaController');
const funcionController = require('../controllers/funcionController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi Proyecto de Cine' });
});

router.get('/cartelera', (req, res) => peliculaController.vistaPeliculas(req, res));

router.get('/nueva-pelicula', (req, res) => peliculaController.vistaNuevaPelicula(req, res));

router.post('/agregar-pelicula', (req, res) => peliculaController.agregarDesdeWeb(req, res));

router.get('/pelicula/:id', (req, res) => peliculaController.vistaDetalle(req, res));

router.get('/ver-funciones', (req, res) => funcionController.vistaFunciones(req, res));

module.exports = router;