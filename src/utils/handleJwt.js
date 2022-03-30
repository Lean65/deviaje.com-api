const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const getProperties = require('./handlePropertiesEngine')
const properties = getProperties()

const tokenSign = async user => {
  const sign = jwt.sign(
    {
      [properties.id]: user[properties.id],
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '2h'
    }
  )
  return sign
}

const verifyToken = async tokenSign => {
  try {
    const verify = await jwt.verify(tokenSign, JWT_SECRET)
    console.log(verify)
    return verify
  } catch (e) {
    console.log(e)
    return null
  }
}

module.exports = { tokenSign, verifyToken }
