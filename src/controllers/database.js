const {
  UsuarioBeta,
  UsuarioAdmin,
  UsuarioBusiness,
  UsuarioClient
} = require('../db')
const { Op } = require('sequelize')

module.exports = {
  postUser: async function (req, res, next) {
    try {
      let { mail, password, userName, favs } = req.body
      const data = await UsuarioBeta.create({
        mail,
        password,
        userName,
        favs
      })
      console.log(data)
      res.status(200).json(data)
    } catch (err) {
      res.status(404).json('user do not created', err)
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
