const { createTransport } = require('nodemailer')
require('dotenv').config()

const transporter = createTransport({
  service: 'gmail',
  port: 587, // 465
  secure: true,
  auth: {
    user: `${process.env.NODEMAILER_USER}`,
    pass: `${process.env.NODEMAILER_PASS}`
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify().then(() => {
  console.log('Ready for send emails')
})

module.exports = transporter