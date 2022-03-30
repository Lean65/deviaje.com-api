const server = require('./src/app')
const { conn } = require('./src/db')
require('dotenv').config()

const logs = require('./src/logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const PORT = process.env.PORT || 3001

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    loggerConsola.info(`Server is run on port ${PORT}`, server.settings.env)
  })
  server.on('error', error => loggerError.error(`Error en servidor ${error}`))
})
