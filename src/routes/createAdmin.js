const router = require('express')()
const { createAdmin } = require('../controllers/createAdmin.js')

router.get('/', createAdmin)

module.exports = router
