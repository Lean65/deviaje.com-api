const { Client, Payment } = require('../db.js')

module.exports = {
  // const {mail, email} = req.query
  // Client.findOne({where: {mail: mail || email}})
  // .then(u => res.status(200).send(u))
  // .catch(e => res.status(401).send('algo malio sal...'))
  getClientDetails: async function (req, res) {
    try {
      const resultado = await Payment.findAll({})
      res.status(200).send(resultado)
    } catch (err) {
      res.status(401).send('algo malio sal...')
    }
  }
}
