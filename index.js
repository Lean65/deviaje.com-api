const server = require('./src/app')
const { conn, Admin } = require('./src/db')
require('dotenv').config()

const logs = require('./src/logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const PORT = process.env.PORT || 4001

//conn.sync({ force: true }).then(() => {
//server.listen(PORT, HOST, () => {

conn.sync({force:true}).then(() => {
  // Admin.findOrCreate(
  //   {
  //     where: {mail : 'leandromelerio@gmail.com'},
  //     defaults: {
  //       mail: 'leandromelerio@gmail.com',
  //       password: '1234',
  //       userName: 'lean65'
  //     }
  //   }
  //   )
  console.log(Admin)
  server.listen(PORT, () => {
    loggerConsola.info(`Server is run on port ${PORT}`, server.settings.env)
  })
  server.on('error', error => loggerError.error(`Error en servidor ${error}`))
  server.on('uncaughtException', function (err) {
    console.log(err)
  })
})
