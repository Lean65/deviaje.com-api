const { handleHttpError } = require('../utils/handleError')

const {
  UsuarioBeta,
  UsuarioAdmin,
  UsuarioBusiness,
  UsuarioClient
} = require('../db')
const { Op } = require('sequelize')

//  {nickname, name, picture, email, email_verified, sub, updated_at}

module.exports = {
  postUser: async function (req, res, next) {
    try {
      const { name, email, email_verified, sub } = req.body
      const user = {
        mail: email,
        password: sub,
        userName: name,
        favs: email_verified
      }

      // await UsuarioBeta.findOrCreate({
      //   where: {
      //     mail: email
      //   },
      //   defaults: {
      //     mail: email,
      //     password: sub,
      //     userName: name,
      //     favs: email_verified
      //   }
      // })
      //let data = await UsuarioBeta.findAll()
      console.log(user)
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
      const data = await UsuarioAdmin.create({
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
      const data = await UsuarioBusiness.create({
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
  postUserClient: async function (req, res, next) {
    try {
      let { mail, password, userName, birthday, favs, points } = req.body
      const data = await UsuarioClient.create({
        mail,
        password,
        userName,
        birthday,
        favs,
        points
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
    }
  }
}
