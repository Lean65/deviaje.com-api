const axios = require('axios')
const { FindLocationValue, ParseData } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'
const logs = require('../logs')
//const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

//Va a NECESITAR recibir el ID por query
//NO SEARCH ID

module.exports = {
  getOneFly: async function (req, res, next) {
    try {
      //console.table(req.query)
      Promise.all([
        FindLocationValue(req.query.fly_from, 'code'),
        FindLocationValue(req.query.fly_to, 'code')
      ])
        .then(resp => {
          req.query.fly_from = resp[0]
          req.query.fly_to = resp[1]
          return req.query
        })
        .then(() =>
          axios.get(`${BASE}/v2/search?${ParseData(req.query)}`, {
            headers: {
              apikey: 'lOcmY9Q0RrcW078bg5nzA-nMzQUEbrHB'
            }
          })
        )
        .then(resp => {
          let resultado = resp.data.data.filter(e => e.id === req.query.id)
          resultado.length > 0
            ? res.status(200).send(resultado)
            : res
                .status(400)
                .send('No se encontraron vuelos para la busqueda actual')
        })
        .catch(e => res.send(e))
    } catch (err) {
      loggerError.error(err)
      handleHttpError(res, 'ERROR_GET_FLIGHTS')
    }
  }
}
