const { Client } = require('../db')

module.exports = (req, res)=>{
    const { mail, password, userName } = req.body
    Client.findAll({where: {mail: mail}})
    .then(data => {
        if(data.length < 1){
            Client.create({
                mail, password, userName
            })
            return res.send('usuario creado con exito')
        }
        else res.send('Ya existe un usuario con ese mail')
    })
}