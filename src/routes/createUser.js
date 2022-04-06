const { User } = require('../db')

module.exports = (req, res)=>{
    const { mail, password, userName } = req.body
    User.findAll({where: {mail: mail}})
    .then(data => {
        if(data.length < 1){
            User.create({
                mail, password, username
            })
            return res.send('usuario creado con exito')
        }
        else res.send('Ya existe un usuario con ese mail')
    })
}
