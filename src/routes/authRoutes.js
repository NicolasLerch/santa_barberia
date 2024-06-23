// routes/authRoutes.js
const express = require('express');
const { login, oauth2callback, logout } = require('../controllers/sheetsAuthController');

const router = express.Router();

router.get('/ingresar', login);
router.get('/oauth2callback', oauth2callback);
router.get('/logout', logout);

module.exports = router;
