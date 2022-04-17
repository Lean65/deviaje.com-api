const { Admin } = require('../db.js')

module.exports = {
    createAdmin: function(req, res){
        Admin.findOrCreate({
            where: {
                mail: req.query.mail
            },
            defaults: {
                mail: req.query.mail,
                password: req.query.password
            }
        })
        .then(()=>{
            const admin = {email:'deviajepuntocom12@gmail.com', password:'123456'}
            res.send(admin)
        })
        .catch(()=>{
            res.send('Paso algo malo...')
        })
    }
}
