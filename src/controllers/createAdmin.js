module.exports = {
  createAdmin: function (req, res) {
    const admin = { email: 'deviajepuntocom12@gmail.com', password: '123456' }
    res.send(admin)
  }
}
