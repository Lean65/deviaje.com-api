const { handleHttpError } = require('../utils/handleError')

const {
  Client,
  Admin,
  Business
} = require('../db')
// console.log(Client)
const { Op } = require('sequelize')
//console.log(UserClient)
//  {nickname, name, picture, email, email_verified, sub, updated_at}

module.exports = {
  postUser: async function (req, res, next) {
    try {
      const { name, email, nickname, sub } = req.body
      const users = []
      const user = {
        mail: email,
        password: sub,
        userName: name,
        favs: nickname
      }
      //console.log(user)
      users.push(user)
      users.map(el => {
        Client.findOrCreate({
          where: {
            mail: email
          },
          defaults: {
            mail: el.mail,
            password: el.password,
            userName: el.userName,
            favs: el.favs
          }
        })
      })
      let aux = await Client.findAll()
      // console.log(aux)
      console.log('ruta postUser anda bien')
      res.status(200).send({ message: 'todo ok' })
    } catch (err) {
      console.log(err)
      handleHttpError(res, 'ERROR_USER_DO_NOT_CREATED')
    }
  },
  postUserAdmin: async function (req, res, next) {
    try {
      let { mail, password, userName } = req.body
      const data = await Usuarioadmin.create({
        mail,
        password,
        userName
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
    }
  },
  postUserBusiness: async function (req, res, next) {
    try {
      let { mail, password, userName } = req.body
      const data = await Usuariobusiness.create({
        mail,
        password,
        userName
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
    }
  }
}
