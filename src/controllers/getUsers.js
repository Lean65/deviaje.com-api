const { Client } = require('../db')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')

module.exports = {
  getUsers: function (req, res) {
    try {
      const { mail, password, userName } = req.body
      Client.findAll()
      .then(data => {
        if(data.length < 1) return res.status(200).send('no hay usuarios en la base de datos')
        else return res.send(data)
      })
      // loggerConsola.info(`Usuarios: ${data}`)
    } catch (error) {
      // loggerError.error(`Error en getUsers ${error}`)
      // handleHttpError(res, 'ERROR_GET_USERS')
      return res.send('No hay usuarios')
    }
  }
}
