const express = require('express')
const router = express.Router()
const axios = require('axios')
const { FindLocationValue, ParseData, DecodeQuery } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'

//La cree solo para una prueba con el front
router.get('/getflightspost', (req, res)=>{
    const obj = DecodeQuery(req.query)
    Promise.all([FindLocationValue(obj.fly_from, 'code'), FindLocationValue(obj.fly_to, 'code')])
    .then(resp => {
        req.body.fly_from = resp[0]
        req.body.fly_to = resp[1]
        return req.body
    })
    .then(() => axios.get(`${BASE}/v2/search?${ParseData(req.body)}`, {headers: {
            apikey: 'lOcmY9Q0RrcW078bg5nzA-nMzQUEbrHB'
        }})
    )
    .then(resp => res.status(200).send(resp.data))
    .catch(e => res.send(e))
})

module.exports = router