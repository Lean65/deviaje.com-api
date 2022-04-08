const { handleHttpError } = require('../utils/handleError')
const { Client, Admin, Business } = require('../db')
// console.log(Client)
const { Op } = require('sequelize')
const nodemailer = require('../nodemailer')
//  {nickname, name, picture, email, email_verified, sub, updated_at}

const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

module.exports = {
  postUser: async function (req, res, next) {
    /*
    body: {
    given_name: 'Leandro',
    nickname: 'leandromelerio',
    name: 'Leandro',
    picture: 'https://lh3.googleusercontent.com/a/AATXAJw3922725DUyxaXaRshdGqoSbXfk0ufYk5UyrH9=s96-c',
    locale: 'es',
    updated_at: '2022-04-07T19:06:48.831Z',
    email: 'leandromelerio@gmail.com',
    email_verified: true,
    sub: 'google-oauth2|118388952624238691808'
    }
    */
    // console.log(req.body)

    try {
      const { name, email, sub, nickname, email_verified } = req.body
      // const user = {
      //   mail: email,
      //   password: sub,
      //   userName: name,
      // }
      let userNew = await Client.findOne({ where: { mail: email } })
      if (userNew) {
        console.log(userNew instanceof Client) // true si esta en la base de datos
        loggerConsola.info(`User ${user.mail} already exists`)
        return res.status(200).send({ message: 'User already exists' })
      } else {
        await Client.create({
          mail: email,
          password: sub,
          userName: name,
          favs: nickname
        })
        const mailOptions = {
          from: 'servidor node.js',
          to: user.mail,
          subject: 'Registro Exitoso',
          html:
            'Bienvenido a deViaje.com <br>' +
            JSON.stringify(
              `Gracias por registrarte ${user.userName} a nuestra aplicación hecha para el proyecto final SoyHenry`
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
        const info = await nodemailer.sendMail(mailOptions) //sendMail(mailOptions)

        loggerConsola.info(`User ${user.mail} created`)
        res.status(200).send({ message: 'todo ok' })
      }
    } catch (err) {
      //console.log(err)
      loggerError.error(err)
      handleHttpError(res, 'ERROR_USER_DO_NOT_CREATED')
    }
  },
  postUserAdmin: async function (req, res, next) {
    try {
      let { mail, password, userName } = req.body
      const data = await Usuarioadmin.create({
        mail,
        password,
        userName
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
    }
  },
  postUserBusiness: async function (req, res, next) {
    try {
      let { mail, password, userName } = req.body
      const data = await Usuariobusiness.create({
        mail,
        password,
        userName
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
    }
  }
}
