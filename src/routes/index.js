const { Router } = require('express')
const { UsuarioBeta } = require('../db')
// require('dotenv').config()
// const { API_KEY } = process.env;
const router = Router()

router.get('/', (req, res)=>{
    res.status(200).send('Todo ok')
})









module.exports = router