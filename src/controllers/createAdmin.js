const { Admin } = require('../db.js')

module.exports = {
    createAdmin: function(req, res){
        const mail = req.query.mail || 'deviajepuntocom12@gmail.com'
        const password = req.query.password || '123456'
        const username = req.query.username || 'DeViaje'

        Admin.findOrCreate({
            where: {
                mail: mail
            },
            defaults: {
                mail: mail,
                password: password,
                username: username
            }
        })
        .then(()=>{
            const admin = {mail, password, username}
            res.send(admin)
        })
        .catch(e=>{
            res.send(e)
        })
    }
}
