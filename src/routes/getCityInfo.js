const { Router } = require('express')
const router = Router()

const { getCityInfo } = require('../controllers/getCityInfo')

router.get('/', getCityInfo)

module.exports = router
