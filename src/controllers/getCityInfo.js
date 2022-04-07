const BASE = 'https://tequila-api.kiwi.com'
const { handleHttpError } = require('../utils/handleError')
const logs = require('../logs')
//const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const axios = require('axios')

module.exports = {
  getCityInfo: async function (req, res, next) {
    try {
      const { search, type } = req.query
      axios
        .get(`${BASE}/locations/query?term=${search}`, {
          headers: {
            apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
          }
        })
        .then(resp => resp.data.locations)
        .then(resp => res.status(200).send(resp))
        .catch(error => res.status(404).send(error))
    } catch (err) {
      loggerError.error(err)
      handleHttpError(res, 'ERROR_GET_CITY_INFO')
    }
  }
}
