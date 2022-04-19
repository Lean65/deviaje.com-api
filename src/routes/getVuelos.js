const { Router } = require('express')
const router = Router()
const { getVuelos } = require('../controllers/getVuelos')

router.get('/', getVuelos)

module.exports = router
