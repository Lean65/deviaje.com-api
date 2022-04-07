const { Router } = require('express')
const router = Router()

const { payment } = require('../controllers/payment')

router.post('/', payment)

module.exports = router
