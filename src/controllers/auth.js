const { tokenSign } = require('../utils/handleJwt')
const { matchedData } = require('express-validator')
const { usersModel } = require('../models')
// const { encrypt, compare } = require('../utils/handlePassword')
const { handleHttpError } = require('../utils/handleError')

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = { ...req, password }
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    }
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_REGISTER_USER')
  }
}

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await usersModel.findOne({ email: req.email })
    //.select('password name email role')

    if (!user) {
      handleHttpError(res, 'USER_NOT_EXISTS', 404)
      return
    }
    //console.log(user)
    const hashPassword = user.password
    const checkPassword = await compare(req.password, hashPassword)

    if (!checkPassword) {
      handleHttpError(res, 'PASSWORD_INVALID', 401)
      return
    }

    user.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSign(user),
      user: user
    }

    res.send({ data })
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'ERROR_LOGIN_USER')
  }
}

module.exports = { registerCtrl, loginCtrl }
