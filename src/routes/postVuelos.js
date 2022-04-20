const { Router } = require('express')
const router = Router()
const { postVuelos } = require('../controllers/postVuelos')

router.post('/', postVuelos)

module.exports = router
