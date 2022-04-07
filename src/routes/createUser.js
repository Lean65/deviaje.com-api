const { Router } = require('express')
const router = Router()

const { createUser } = require('../controllers/createUser')

router.post('/', createUser)

module.exports = router
