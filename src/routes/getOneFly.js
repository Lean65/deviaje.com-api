const { Router } = require('express')
const router = Router()

const { getOneFly } = require('../controllers/getOneFly')

router.get('/', getOneFly)

module.exports = router
