const express = require('express')
const router = express.Router()
const { payment } = require('../controllers/payment')

const { payment } = require('../controllers/payment')

router.post('/', payment)

module.exports = router
