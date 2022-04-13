const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')
const { handleHttpError } = require('../utils/handleError')
const { Client } = require('../db')

console.log(Client)

module.exports = {
  updatepersonalinfo: function (req, res) {
    //Necesito un parametro por el que hacer la busqueda, ej: mail
    // let mail = 'algo@gmail.com'
    const { email, dni, birthday, phone, country, state, city } = req.body
    // console.log(req.body)
    // console.log('*************')
    Client.update({
      dni, birthday, phonenumber: phone, country, state, city
    }, {where: {mail: email}})
    .then(()=>res.send('Informacion de ' + email + ' actualizada con exito'))
    .catch(error => {
      loggerError.error(error)
      handleHttpError(error, res)
    })
    

    // try {
      // loggerConsola.info(req.body)
      // Client.findOne({where: {mail: req.body.mail}})
      // .then(r=>)
      
      // res.status(200).send('informacion actualizada con exito')
    // } catch (error) {
    //   loggerError.error(error)
    //   handleHttpError(error, res)
    // }
  }
}

// const {birthday, verifiedmail, favs, points, user} = req.body
// Client.update({
//     birthday: birthday,
//     verifiedmail: verifiedmail,
//     favs: favs,
//     points: points
// }, { where: {username: user} })
// .then(r=>res.send('info actch(e=>res.status(401)ualizada en ' + user))
// .cat.send(e))