const { FindLocationValue, ParseData } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'
const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/topdestination', (req, res)=>{
    const {city} = req.query         //Para cuando se reciba el termino por query
    // const ID = 
    console.log('holis')
    FindLocationValue(city, 'id').then(id => {
        axios.get(`${BASE}/locations/topdestinations?term=${id}`, {headers: {
            apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
        }})
        .then(resp => res.status(200).send(resp.data.locations))
        .catch(error => res.status(404).send(error))
    })
})

module.exports = router