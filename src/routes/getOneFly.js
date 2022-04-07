const express = require('express')
const router = express.Router()
const { getOneFly } = require('../controllers/getOneFly')

router.get('/', getOneFly)

module.exports = router
