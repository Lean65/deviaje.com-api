const express = require('express')
const router = express.Router()
const { getFlightsPost } = require('../controllers/getFlightsPost')

//La cree solo para una prueba con el front
router.get('/', getFlightsPost)

module.exports = router
