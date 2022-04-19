const { Fly } = require('../db.js')
//console.log(Fly)
const { handleHttpError } = require('../utils/handleError')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

module.exports = {
  getVuelos: function (req, res) {
    //const name = req.body.name || req.query.name
    //console.log(name)
    Fly.findAll()
      .then(r =>
        // res.send(
        //   r.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
        // )
        loggerConsola.info(res.send(r), 'Información de vuelo guardada')
      )
      .catch(error => {
        loggerError.error('Error en la base de datos')
        handleHttpError(res, 'ERROR_Flys_DO_NOT_FOUND')
      })
  }
}
