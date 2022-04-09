const { FindLocationValue, ParseData } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'
const axios = require('axios')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')

//topdestinations
/*
Parametros del query
  city=...      nombre de la ciudad a buscar.
  q=...         cantidad a traer
*/
module.exports = {
  topDestination: function (req, res) {
    try {
      const { city, q } = req.query
      FindLocationValue(city, 'id').then(id => {
        axios
          .get(`${BASE}/locations/topdestinations?term=${id}`, {
            headers: {
              apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
            }
          })
          .then(resp =>
            res.status(200).send(
              resp.data.locations.sort((a, b) => {
                if (a.rank < b.rank) return -1
                if (a.rank > b.rank) return 1
                return 0
              }).splice(0, q)
            )
          )
          .then(resp => {
            loggerConsola.info(resp)
          })
          .catch(error => res.status(404).send(error))
      })
    } catch (error) {
      loggerError.error(error)
      handleHttpError(error, res)
    }
  }
}
