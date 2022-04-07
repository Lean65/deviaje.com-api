const express = require('express')
const router = express.Router()
const { getFlights } = require('../controllers/getFlights')

router.get('/', getFlights)

module.exports = router
