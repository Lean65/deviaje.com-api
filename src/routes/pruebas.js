const axios = require('axios')
const { Router } = require('express')
require('dotenv').config()
// const { API_KEY } = process.env;
const router = Router()
const BASE = 'https://tequila-api.kiwi.com'
const { handleHttpError } = require('../utils/handleError')

// https://tequila-api.kiwi.com/locations/anything?key=name&value=mar%20del%20plata&locale=en-US&active_only=true
// router.get('/', (req, res) => {
//   res.status(200).send('Todo ok')
// })

//Solo la use para crear la funcion FindCode
router.get('/findcode', (req, res) => {
  const KEY = 'lOcmY9Q0RrcW078bg5nzA-nMzQUEbrHB'
  const { term } = req.query
  axios
    .get(`${BASE}/locations/query?term=${term}`, {
      headers: {
        apikey: KEY
      }
    })
    .then(r => r.data.locations.filter(e => e.type === 'city'))
    .then(r => res.send(r[0].code))
    // .then(r=>r.data.locations.filter(e=>e.name.toLowerCase()===term.toLowerCase()))
    // .then(r=>res.send(r[0].code))
    .catch(e => res.send(e))
})

async function FindCode (name) {
  const KEY = 'lOcmY9Q0RrcW078bg5nzA-nMzQUEbrHB'
  try {
    const resp = await axios.get(`${BASE}/locations/query?term=${name}`, {
      headers: {
        apikey: KEY
      }
    })
    return resp.data.locations.filter(e => e.type === 'city')[0].code
  } catch (error) {
    return error
  }
  //Forma promesa
  // .then(r=>{
  //     console.log(r.data.locations[0])
  //     return r.data.locations.filter(e=>e.type==='city')[0].code
  // })
  // .catch(e=>e)
  // .then(r=>res.send(r[0].code))
}

//Trae un vuelo recibiendo por params from y to
router.get('/getvuelos', async (req, res) => {
  console.log(req.query)
  const { from, to } = req.query
  const URL = 'https://tequila-api.kiwi.com/v2/search'
  const cityCode = await FindCode(from)
  const cityCode2 = await FindCode(to)
  // console.log(cityCode)
  // const from2 = 'BUE'
  // const to = 'BRC'
  // const search = 'buenos aires'
  // const {from, to} = req.query
  const dateFrom = '01/04/2022'
  const dateTo = '02/04/2022'
  //Requeridos fly_from, date_from, date_to

  try {
    const alter = await axios.get(
      `${URL}?fly_from=${cityCode}&fly_to=${cityCode2}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          apikey: 'lOcmY9Q0RrcW078bg5nzA-nMzQUEbrHB'
        }
      }
    )
    // console.log(alter.data)
    res.send(alter.data.data)
  } catch (error) {
    res.send(error)
  }
  // .then(resp => res.status(200).send(resp.data))
  // .catch(err => res.status(404).send(err))
  // res.status(200).send('Todo ok')
})

//Ni idea
// router.get('/asd', (req, res)=>{
//     const URL = 'https://tequila-api.kiwi.com/v2/search'
//     const from = 'LGA'
//     const to = 'MIA'
//     const dateFrom = '01/04/2022'
//     const dateTo = '02/04/2022'
//     //Requeridos fly_from, date_from, date_to
//     axios.get(`${URL}?fly_from=city:${from}&fly_to=city:${to}&dateFrom=${dateFrom}&dateTo=${dateTo}`, {headers: {
//         apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
//     }})
//     console.log('todo bien por ahora')
//     .then(resp => res.status(200).send(resp.data))
//     .catch(err => res.status(404).send(err))
//     // res.status(200).send('Todo ok')
// })

/*
ej: https://tequila-api.kiwi.com/v2/search?fly_from=city:LGA&fly_to=MIA&dateFrom=01/04/2021&dateTo=02/04/2021

Prerequisites
TLS protocol version 1.2 or later must be used.
We book the flights with the cheapest fare available.
The correct date format is dd/mm/YYYY, e.g. 29/05/2021
In order to implement the Booking API you need to use the booking_token which contains all the required flight's data. These need to be passed as parameters to check flights as well as to save booking calls.
local departure and arrival times are indicated by parameters local_departure and local_arrival.
We do not support using body in GET requests.
The responses can be gzipped, if request header accept-encoding:gzip, and need to be unpacked if response header is Content-Encoding: gzip
*/

// router.get('/query', (req, res)=>{
//     const {term, type} = req.query
//     axios.get(`${BASE}/locations/query?term=${term || 'london_gb'}`, {headers: {
//         apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
//     }})
//     .then(resp => resp.data.locations.filter(e=>e.type === type)).then(resp => res.status(200).send(resp))
//     .catch(error => res.status(404).send(error))
// })

router.get('/topdistinations', (req, res) => {
  const { term } = req.query //Para cuando se reciba el termino por query
  axios
    .get(`${BASE}/locations/topdestinations?term=${term || 'london_gb'}`, {
      headers: {
        apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
      }
    })
    .then(resp => res.status(200).send(resp.data.locations))
    .catch(error => res.status(404).send(error))
})

// router.get('/onetop', (req, res)=>{
//     axios.get(`${BASE}/locations/topdestinations?term=london_gb`, {headers: {
//         apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
//     }})
//     .then(resp => res.status(200).send(resp.data.locations[0]))
//     .catch(error => res.status(404).send('hubo un error'))
// })

module.exports = router

/*
    respuesta:
    "meta": {
        "locale": {
        "code": "en-US",
        "status": "Locale not specified, using default."
        }
    },
    "locations": [...],
    "last_refresh": 1648560473,
    "results_retrieved": 100
    */
