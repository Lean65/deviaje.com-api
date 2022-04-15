const { handleHttpError } = require('../utils/handleError')
const { Client, Admin, Business } = require('../db')
// console.log(Client)
// const { Op } = require('sequelize')
const nodemailer = require('../nodemailer')
//  {nickname, name, picture, email, email_verified, sub, updated_at}

const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

module.exports = {
  postUser: async function (req, res, next) {
    try {
      const { email, sub, given_name, email_verified } = req.body
      let userNew = await Client.findOne({ where: { mail: email } })
      if (userNew) {
        console.log(userNew instanceof Client) // true si esta en la base de datos
        loggerConsola.info(`User ${userNew.mail} already exists`)
        return res.status(200).send({ message: 'User already exists' })
      } else {
        await Client.create({
          mail: email,
          password: sub,
          username: given_name,
          verifiedmail: email_verified
        })
        const mailOptions = {
          from: 'servidor node.js',
          to: email,
          subject: 'Successful registration',
          html:
            'Welcome to deViaje.com <br>' +
            JSON.stringify(
              `Thank you  for registering  ${given_name} at  deViaje.com, have a great day`
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

        loggerConsola.info(`User ${email} created`)
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
      let { mail, password, username } = req.body
      const data = await Admin.create({
        mail,
        password,
        username
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
    }
  },
  postUserBusiness: async function (req, res, next) {
    try {
      let { mail, password, username } = req.body
      const data = await Business.create({
        mail,
        password,
        username
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
    }
  }
}
