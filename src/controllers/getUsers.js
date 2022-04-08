const { Client } = require('../db')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')

module.exports = {
  getUsers: function (req, res) {
    try {
      const { mail, password, userName } = req.body
      Client.findAll().then(data =>
        data.length < 1
          ? res.send('No hay usuarios. Se el primero!')
          : res.send(data)
      )
      loggerConsola.info(`Usuarios: ${data}`)
    } catch (error) {
      loggerError.error(`Error en getUsers ${error}`)
      handleHttpError(res, 'ERROR_GET_USERS')
    }
  }
}
