const server = require('./src/app')
const { conn } = require('./src/db')
require('dotenv').config()
const cors = require('cors')

const logs = require('./src/logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const PORT = process.env.PORT || 4001

<<<<<<< HEAD
//conn.sync({ force: true }).then(() => {
//server.listen(PORT, HOST, () => {

conn.sync({ force: false }).then(() => {
=======
conn.sync({ force: true }).then(() => {
>>>>>>> 9e2d9b7ab5b188d8b04f81b1191c8ba184ff78df
  server.listen(PORT, () => {
    loggerConsola.info(`Server is run on port ${PORT}`, server.settings.env)
  })
  server.on('error', error => loggerError.error(`Error en servidor ${error}`))
  server.on('uncaughtException', function (err) {
    console.log(err)
  })
})
