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
    try {
      const { name, email, nickname, sub } = req.body
      const user = {
        mail: email,
        password: sub,
        userName: name,
        favs: nickname
      }
      let userNew = await Client.findOne({ where: { mail: user.mail } })
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
            )
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
