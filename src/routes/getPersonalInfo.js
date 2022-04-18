const router = require('express').Router()
const { getInfo } = require('../controllers/getPersonalInfo')

router.get('/', getInfo)

module.exports = router
