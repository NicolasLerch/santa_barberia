const express = require('express')
const router = express.Router()
const calendlyController = require('../controllers/calendlyController')

// router.get('/check', calendlyController.checkToken)
router.get('/code', calendlyController.getCode)
router.get('/proximos', calendlyController.getInvitees)
router.get('/invitados', calendlyController.getInvitees)


module.exports = router