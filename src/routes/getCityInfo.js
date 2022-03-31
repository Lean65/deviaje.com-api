const BASE = 'https://tequila-api.kiwi.com'
const axios = require('axios')
const express = require('express')
const router = express.Router()

//Se puede usar para buscar localizaciones pasando el nombre de una ciudad como "term", alternativamente un type que se
//usaria para filtrar resultados
router.get('/getcityinfo', (req, res)=>{
    const {search, type} = req.query
    axios.get(`${BASE}/locations/query?term=${search}`, {headers: {
        apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
    }})
    .then(resp => resp.data.locations)
    .then(resp => res.status(200).send(resp))
    .catch(error => res.status(404).send(error))
})

module.exports = router