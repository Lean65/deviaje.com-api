const { handleHttpError } = require('../utils/handleError')
const { Client, Admin, Business } = require('../db')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { Op } = require('sequelize')
const nodemailer = require('../nodemailer')

module.exports = {
  paymentForm: async function (req, res, next) {
    try {
      const { name, email, address } = req.body
      const user = { name, email, address }
      let userNew = await Client.findOne({ where: { mail: user.email } })
      if (userNew) {
        console.log(userNew instanceof Client) // true si esta en la base de datos
        loggerConsola.info(`User ${user.email} already exists`)
        const mailOptions = {
          from: 'servidor node.js',
          to: user.email,
          subject: 'Successful Purchase',
          html:
            'Welcome to  deViaje.com <br>' +
            JSON.stringify(`Thanks for shopping  ${user.name} at  deViaje.com`),
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

        return res.status(200).send({ message: 'todo ok' })
      } else {
        loggerConsola.info(`User ${user.email} not exists`)
        res.status(200).send({ message: 'usuario no registrado' })
      }
    } catch (err) {
      loggerError.error(err)
      handleHttpError(res, 'ERROR_USER_DO_NOT_CREATED')
    }
  }
}
