const { handleHttpError } = require('../utils/handleError')
const { Client, Passenger } = require('../db')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { Op } = require('sequelize')
const nodemailer = require('../nodemailer')

module.exports = {
  passengersInfo: async function (req, res, next) {
    try {
      const { passengersInfo, usermail } = req.body
      console.log(passengersInfo)
      console.log(usermail)

      passengersInfo.map(el =>
        Passenger.create({
          name: el.name,
          lastname: el.lastname,
          document: el.document,
          birthday: el.birth,
          country: el.country
        })
      )
      let user = {}

      user.name = passengersInfo.map(e => e.name).join(';  ')
      user.lastname = passengersInfo.map(e => e.lastname).join(';  ')
      user.document = passengersInfo.map(e => e.document).join(';  ')
      user.birth = passengersInfo.map(e => e.birth).join(';  ')
      user.country = passengersInfo.map(e => e.country).join('; ')

      let userNew = await Client.findOne({ where: { mail: usermail } })
      if (userNew) {
        console.log(userNew instanceof Client) // true si esta en la base de datos
        loggerConsola.info(`User ${usermail} already exists`)
        const mailOptions = {
          from: 'servidor node.js',
          to: usermail,
          subject: 'Tickets Information',
          html:
            'Tickets Information <br><br>' +
            JSON.stringify(
              `<h4>Name :</h4>  ${user.name} ` +
                `<h4>Last Name :</h4>  ${user.lastname} ` +
                `<h4>DNI :</h4>  ${user.document} ` +
                `<h4>Birthday :</h4> ${user.birth} ` +
                `<h4>Nationality : </h4> ${user.country} `
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

        return res.status(200).send({ message: 'todo ok' })
      } else {
        loggerConsola.info(`User ${usermail} not  exists`)
        res.status(401).send({ message: 'usuario no registrado' })
      }
      return res.status(200).send({ message: 'todo ok passengerInfo' })
    } catch (err) {
      loggerError.error(err)
      handleHttpError(res, 'ERROR_USER_DO_NOT_CREATED')
    }
  }
}
