const server = require('../app')
const { conn } = require('../db')
require('dotenv').config()


const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const PORT = process.env.PORT || 3001
const HOST = '0.0.0.0'

conn.sync({ force: true }).then(() => {
  server.listen(PORT, HOST, () => {
    loggerConsola.info(`Server is run on port ${PORT}`, server.settings.env)
  })
  server.on('error', error => loggerError.error(`Error en servidor ${error}`))
})
