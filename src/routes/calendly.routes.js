const express = require('express')
const router = express.Router()
const calendlyController = require('../controllers/calendlyController')

router.get('/code', calendlyController.getCode)
router.get('/proximos', calendlyController.getInvitees)


module.exports = router