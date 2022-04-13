const { Client } = require('../db')
const nodemailer = require('../nodemailer/index')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')

module.exports = {
  createUser: function (req, res) {
    console.log(req.body)
    try {
      const { email, sub, given_name, email_verified } = req.body
      Client.findOne({ where: { mail: email } })
      .then(user => {
        if (!user) {
          Client.create({
            mail: email,
            password: sub,
            username: given_name,
            verifiedmail: email_verified
          })
          // .then(r=>res.send('usuario creado con exito'))
          // .catch(r=>res.send('el usuario ya existe o hubo un problema'))

          const mailOptions = {
            from: 'servidor node.js',
            to: email,
            subject: 'Registro Exitoso',
            html:
              'Bienvenido a deViaje.com <br>' +
              JSON.stringify(
                `Gracias por registrarte ${given_name} a nuestra aplicación hecha para el proyecto final SoyHenry`
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
/*
{
  given_name: 'Leandro',
  nickname: 'leandromelerio',
  name: 'Leandro',
  picture: 'https://lh3.googleusercontent.com/a/AATXAJw3922725DUyxaXaRshdGqoSbXfk0ufYk5UyrH9=s96-c',
  locale: 'es',
  updated_at: '2022-04-12T15:58:21.176Z',
  email: 'leandromelerio@gmail.com',
  email_verified: true,
  sub: 'google-oauth2|118388952624238691808'
}
*/