const { FindLocationValue, ParseData } = require('../utils/routes')
const BASE = 'https://tequila-api.kiwi.com'
const axios = require('axios')
const logs = require('../logs')
//const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

module.exports = {
  topDestination: async function (req, res, next) {
    try {
      const { city } = req.query //Para cuando se reciba el termino por query
      // const ID =
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
              })
            )
          )
          .catch(error => res.status(404).send(error))
      })
    } catch (error) {
      loggerError.error(error)
      handleHttpError(res, 'ERROR_GET_CITY_INFO')
    }
  }
}
