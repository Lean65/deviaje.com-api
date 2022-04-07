const axios = require('axios')
const { FindLocationValue, ParseData } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')

//La cree solo para una prueba con el front
module.exports = {
  getFlightsPost: function (req, res) {
    try {
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
        .then(resp => res.status(200).send(loggerConsola.info(resp.data)))
        .catch(e => res.send(e))
    } catch (error) {
      loggerError.error(`Error en getFlightsPost ${error}`)
      handleHttpError(res, 'ERROR_GET_FLIGHTS')
    }
  }
}
