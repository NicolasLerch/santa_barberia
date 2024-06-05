const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const path = require('path');


router.get('/', indexController.home);
router.get('/contacto', indexController.contact);
router.get('/local', indexController.local);
router.get('/turnos', indexController.appointments);
router.get('/precios', indexController.prices);

module.exports = router;