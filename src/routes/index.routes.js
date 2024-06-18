const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const path = require('path');
const calendlyController = require('../controllers/calendlyController');


router.get('/', indexController.home);
router.get('/contacto', indexController.contact);
router.get('/local', indexController.local);
router.get('/turnos', indexController.appointments);
router.get('/precios', indexController.prices);

router.get('/auth', calendlyController.checkToken);

module.exports = router;