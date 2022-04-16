const { Client } = require('../db.js')


module.exports = (req, res)=>{
    const {mail, email} = req.query
    Client.findOne({where: {mail: mail || email}})
    .then(u => res.status(200).send(u))
    .catch(e => res.status(401).send('algo malio sal...'))
}
