const { handleHttpError } = require('../utils/handleError')
const { Fly } = require('../db')
// console.log(Client)
const { Op } = require('sequelize')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

module.exports = {
  postVuelos: async function (req, res, next) {
    try {
      const vuelo = req.body
      const {
        departure,
        arrival,
        date,
        cityD,
        cityA,
        timeD,
        timeA,
        duration
      } = vuelo
      //console.log(vuelo)
      await Fly.create({
        departure,
        arrival,
        date,
        cityD,
        cityA,
        timeD,
        timeA,
        duration
      })

      loggerConsola.info('Información de vuelo recibida')
      res.status(200).send({ message: 'todo ok' })
    } catch (err) {
      loggerError.error(err)
      handleHttpError(res, 'ERROR_USER_DO_NOT_CREATED')
    }
  }
}
