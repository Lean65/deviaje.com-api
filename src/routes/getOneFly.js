const express = require('express')
const router = express.Router()
const { getOneFly } = require('../controllers/getOneFly')

router.get('/', getOneFly)

module.exports = (req, res)=>{
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
    .then(resp => {
        let resultado = resp.data.data.filter(e=>e.id === req.query.id)
        resultado.length > 0 ? res.status(200).send(resultado) : res.status(400).send('No se encontraron vuelos para la busqueda actual')
    })
    .catch(e => res.send(e))
}
