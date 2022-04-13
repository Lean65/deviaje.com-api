const { Router } = require('express')
require('dotenv').config()
const router = Router()
const BASE = 'https://tequila-api.kiwi.com'
const { handleHttpError } = require('../utils/handleError')
const { postUser } = require('../controllers/postUser')

// https://tequila-api.kiwi.com/locations/anything?key=name&value=mar%20del%20plata&locale=en-US&active_only=true

// router.post('/', postUser)
//Se usar ruta: postuser/admin
router.post('/Admin', (req, res) => {
  console.log('admin')
  try {
    const { email, password, userName } = req.body
    const user = { email, password, userName }
    console.log('ruta postUser anda bien')
    res.status(200).send({ message: 'todo ok' })
  } catch (err) {
    console.log(err)
    handleHttpError(res, 'ERROR_LOGIN')
  }
})

module.exports = router
