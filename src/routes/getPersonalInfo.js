const router = require('express').Router()
const { getInfo } = require('../controllers/getPersonalInfo')

router.post('/', getInfo)

module.exports = router
