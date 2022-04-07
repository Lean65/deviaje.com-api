const BASE = 'https://tequila-api.kiwi.com'
const axios = require('axios')
const { handleHttpError } = require('../utils/handleError')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

//getcityinfo
//Se puede usar para buscar localizaciones pasando el nombre de una ciudad como "term", alternativamente un type que se
//usaria para filtrar resultados
module.exports = {
  getCityInfo: function (req, res) {
    try {
      const { search, type } = req.query
      axios
        .get(`${BASE}/locations/query?term=${search}`, {
          headers: {
            apikey: 'n_-RwJB-98J-s0_OyVx1n9tFSd5SPtoI'
          }
        })
        .then(resp => resp.data.locations)
        .then(data => {
          loggerConsola.info({
            message: 'Se encontro la info de la ciudad'
          })
        })
        .then(resp => res.status(200).send(resp))
        .catch(error => res.status(404).send(error))
    } catch (err) {
      loggerError.error(`Error en getCityInfo ${err}`)
      handleHttpError(res, 'ERROR_GET_CITY_INFO')
    }
  }
}
