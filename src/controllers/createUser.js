const { Client } = require('../db')
const nodemailer = require('../nodemailer/index')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')

module.exports = {
  createUser: function (req, res) {
    try {
      const { mail, password, userName } = req.body
      Client.findAll({ where: { mail: mail } }).then(data => {
        if (data.length < 1) {
          Client.create({
            mail,
            password,
            userName
          })
          const mailOptions = {
            from: 'servidor node.js',
            to: mail,
            subject: 'Registro Exitoso',
            html:
              'Bienvenido a deViaje.com <br>' +
              JSON.stringify(
                `Gracias por registrarte ${userName} a nuestra aplicación hecha para el proyecto final SoyHenry`
              ),
            attachments: [
              {
                //filename: 'license.txt',
                //path: '/public/logoDesign.jpg'
                path:
                  'https://st2.depositphotos.com/4492993/7247/v/950/depositphotos_72470597-stock-illustration-vector-airplane-travel-tourism.jpg'
              }
            ]
          }

          const info = nodemailer.sendMail(
            mailOptions,
            (err => console.log('hubo un error al mandar el email'),
            info => loggerConsola.info(`Email enviado: ${info.response}`))
          ) //sendMail(mailOptions)
          return res.send('usuario creado con exito')
        } else res.send('Ya existe un usuario con ese mail')
      })
    } catch (err) {
      loggerError.error(`Error en crear usuario ${err}`)
      handleHttpError(res, 'ERROR_CREATE_USER')
    }
  }
}
