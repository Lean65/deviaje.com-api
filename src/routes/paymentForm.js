const { Router } = require('express')
const router = Router()

const { paymentForm } = require('../controllers/paymentForm')

router.post('/', paymentForm)

module.exports = router
