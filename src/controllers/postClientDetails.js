const { handleHttpError } = require('../utils/handleError')
const { Payment } = require('../db')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { Op } = require('sequelize')

module.exports = {
  postClientDetails: async function (req, res, next) {
    try {
      const { billingDetails, price } = req.body
      // console.log(billingDetails)
      // console.log(price)
      const { email, name, address } = billingDetails

      let userNew = await Payment.findOne({
        where: { mail: email }
      })
      if (userNew) {
        console.log(userNew instanceof Payment) // true si esta en la base de datos
        loggerConsola.info(`User ${email} already exists`)
        console.log(user)
        return res.status(200).send({ message: 'todo ok' })
      } else {
        await Payment.create({
          mail: email,
          monto: price,
          name: name,
          address: address
        })

        loggerConsola.info(`User ${email} not exists`)
        return res.status(200).send({ message: 'usuario no registrado' })
      }
    } catch (err) {
      loggerError.error(err)
      handleHttpError(res, 'ERROR_USER_DO_NOT_CREATED')
    }
  }
}
