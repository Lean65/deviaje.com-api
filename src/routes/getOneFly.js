const express = require('express')
const router = express.Router()
const axios = require('axios')
const { FindLocationValue, ParseData } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'


router.get('/getonefly', (req, res)=>{
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
    .then(resp => res.status(200).send(resp.data.data[0]))
    .catch(e => res.send(e))
})

module.exports = router