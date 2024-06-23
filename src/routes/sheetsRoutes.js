// routes/sheetsRoutes.js
const express = require('express');
const router = express.Router();
const { appendValues, addForm } = require('../controllers/sheetsController.js');
const { ensureAuthenticated } = require('../middlewares/authMiddleware.js');



router.get('/form',addForm);
router.post('/add', appendValues);

module.exports = router;
