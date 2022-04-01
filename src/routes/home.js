const express = require('express')
const router = express.Router()

//Componente de prueba. No hace falta.
const fun = (req, res)=>{
    res.send('todo ok en home')
}

router.get('/home', fun)

module.exports = router