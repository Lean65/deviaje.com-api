const express = require('express')
const router = express.Router()
const { passengersInfo } = require('../controllers/passengersInfo')

router.post('/', passengersInfo)

module.exports = router
