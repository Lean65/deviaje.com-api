const { Fly, Payment } = require('../db.js')
const { handleHttpError } = require('../utils/handleError')

module.exports = {
  // const {mail, email} = req.query
  // Client.findOne({where: {mail: mail || email}})
  // .then(u => res.status(200).send(u))
  // .catch(e => res.status(401).send('algo malio sal...'))
  getClientDetails: async function (req, res) {
    try {
      const resultado = await Payment.findAll({
        include: Fly
      })
      res.status(200).send(resultado)
    } catch (err) {
      handleHttpError(res, 'ERROR_PAYMENT_DO_NOT_CREATED')
      res.status(401).send('algo malio sal...')
    }
  }
}
