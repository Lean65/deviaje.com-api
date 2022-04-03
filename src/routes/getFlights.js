const express = require('express')
const router = express.Router()
const axios = require('axios')
const { FindLocationValue, ParseData } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'


module.exports = (req, res) => {
    Promise.all([FindLocationValue(req.query.fly_from, 'code'), FindLocationValue(req.query.fly_to, 'code')])
    .then(resp => {
        req.query.fly_from = resp[0]
        req.query.fly_to = resp[1]
        return req.query
    })
    .then(() => axios.get(`${BASE}/v2/search?${ParseData(req.query)}`, {headers: {
            apikey: 'lOcmY9Q0RrcW078bg5nzA-nMzQUEbrHB'
        }})
    )
    .then(resp => resp.data.data.length > 0 ? res.status(200).send(resp.data) :
        res.status(400).send('No se encontraron vuelos para la busqueda actual'))
    .catch(e => res.send(e))
}
