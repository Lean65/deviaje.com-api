const server = require('./src/app.js')
const { conn } = require('./src/db')
require('dotenv').config()

const logs = require('./src/logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const PORT = process.env.PORT || 4001

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    loggerConsola.info(`Server is run on port ${PORT}`, server.settings.env)
  })
  server.on('error', error => loggerError.error(`Error en servidor ${error}`))
  server.on('uncaughtException', function (err) {
    console.log(err)
  })
})
