const { Router } = require('express')
const router = Router()
const { getFlightsPost } = require('../controllers/getFlightsPost')

router.get('/', getFlightsPost)

module.exports = router
