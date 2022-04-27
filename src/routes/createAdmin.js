const { Router } = require('express')
const router = Router()

const { createAdmin } = require('../controllers/createAdmin')

router.get('/', createAdmin)

module.exports = router
