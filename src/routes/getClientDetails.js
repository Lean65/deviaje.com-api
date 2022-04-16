const router = require('express').Router()
const { getClientDetails } = require('../controllers/getClientDetails')

router.get('/', getClientDetails)

module.exports = router
