const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')

module.exports = {
  updatepersonalinfo: function (req, res) {
    try {
      loggerConsola.info(req.body)
      res.status(200).send(req.body)
    } catch (error) {
      loggerError.error(error)
      handleHttpError(error, res)
    }
  }
}

// const {birthday, verifiedmail, favs, points, user} = req.body
// Client.update({
//     birthday: birthday,
//     verifiedmail: verifiedmail,
//     favs: favs,
//     points: points
// }, { where: {username: user} })
// .then(r=>res.send('info actualizada en ' + user))
// .catch(e=>res.status(401).send(e))