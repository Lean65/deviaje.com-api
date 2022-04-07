const { Router } = require('express')
const router = Router()

const { topDestination } = require('../controllers/topDestination')

router.get('/', topDestination)

module.exports = router
