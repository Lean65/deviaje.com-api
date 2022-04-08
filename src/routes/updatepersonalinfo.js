const { Router } = require('express')
const router = Router()

const { updatepersonalinfo } = require('../controllers/updatepersonalinfo')

router.post('/', updatepersonalinfo)

module.exports = router
