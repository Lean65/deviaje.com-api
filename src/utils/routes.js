const axios = require('axios')
const BASE = 'https://tequila-api.kiwi.com'
const KEY = 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'

const FindLocationValue = (name, value) => {
    const KEY = 'lOcmY9Q0RrcW078bg5nzA-nMzQUEbrHB'
    return axios.get(`${BASE}/locations/query?term=${name}`, {headers: {
        apikey: KEY
    }})
    .then(r=>r.data.locations.filter(e=>e.type==='city')[0][value])
    .catch(e=>e)
    // .then(a=>a)
}
const DecodeQuery = str => Object.fromEntries(str.split('&').map(e=>e.split('=')))
const ParseData = obj => Object.entries(obj).map(e=>e.join('=')).join('&')

module.exports = {
    FindLocationValue,
    DecodeQuery,
    ParseData
}