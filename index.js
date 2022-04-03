const server = require('./src/app')
const { conn } = require('./src/db')
require('dotenv').config()

const logs = require('./src/logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

<<<<<<< HEAD
const PORT = process.env.PORT || 4001
=======
const PORT = process.env.PORT || 3001
const HOST = 'localhost' || '0.0.0.0'
>>>>>>> 6cad4e4321eb9f99c0f85da9af1c592c302193d9

conn.sync({ force: true }).then(() => {
  server.listen(PORT, HOST, () => {
    loggerConsola.info(`Server is run on port ${PORT}`, server.settings.env)
  })
  server.on('error', error => loggerError.error(`Error en servidor ${error}`))
  server.on('uncaughtException', function (err) {
    console.log(err)
  })
})
