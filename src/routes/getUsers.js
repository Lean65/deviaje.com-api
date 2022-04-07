const { Client } = require('../db')

module.exports = (req, res)=>{
    const { mail, password, userName } = req.body
    Client.findAll()
    .then(data => data.length < 1 ? res.send('No hay usuarios. Se el primero!') : res.send(data))
}
