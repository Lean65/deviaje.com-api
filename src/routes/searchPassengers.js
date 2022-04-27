const router = require('express').Router()
const { getInfo } = require('../controllers/searchPassengers')

router.get('/', getInfo)

module.exports = router
