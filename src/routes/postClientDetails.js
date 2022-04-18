const express = require('express')
const router = express.Router()
const { postClientDetails } = require('../controllers/postClientDetails')

router.post('/', postClientDetails)

module.exports = router
