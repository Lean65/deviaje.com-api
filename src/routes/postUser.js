const axios = require('axios')
const { Router } = require('express')
require('dotenv').config()
// const { API_KEY } = process.env;
const router = Router()
const BASE = 'https://tequila-api.kiwi.com'
const { handleHttpError } = require('../utils/handleError')

// https://tequila-api.kiwi.com/locations/anything?key=name&value=mar%20del%20plata&locale=en-US&active_only=true

router.post('/', (req, res) => {
  try {
    const user = req.body
    console.log(user)
    console.log('ruta postUser anda bien')
    res.status(200).send({ message: 'todo ok' })
  } catch (err) {
    console.log(err)
    handleHttpError(res, 'ERROR_LOGIN')
  }
})

router.post('/Admin', (req, res) => {
  try {
    const { email, password, userName } = req.body
    const user = { email, password, userName }
    console.log(user)
    console.log('ruta postUser anda bien')
    res.status(200).send({ message: 'todo ok' })
  } catch (err) {
    console.log(err)
    handleHttpError(res, 'ERROR_LOGIN')
  }
})

module.exports = router
