const { Router } = require('express')
const { topDestination } = require('../controllers/topDestination')
const router = Router()
//topdestination
router.get('/', topDestination)

module.exports = router
