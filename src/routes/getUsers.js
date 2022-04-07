const { Router } = require('express')
const router = Router()
const { getUsers } = require('../controllers/getUsers')

router.get('/', getUsers)

module.exports = router
