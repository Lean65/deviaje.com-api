const { handleHttpError } = require('../utils/handleError')
const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

module.exports = {
  payment: async (req, res) => {
    try {
      const { amount } = req.body //user(mail)
      console.log('payment')
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd'
      })
      loggerConsola.info((message = 'Se creo el pago'))
      res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
      loggerError.error(`Error en payment ${err}`)
      handleHttpError(res, 'ERROR_PAYMENT')
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  }
}
