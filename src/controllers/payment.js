const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const logs = require('../logs')
//const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

module.exports = {
  payment: async function (req, res) {
    try {
      const { amount } = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd'
      })
      res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
      loggerError.error(err)
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  }
}
