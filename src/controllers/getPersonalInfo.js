const { Client } = require('../db.js')

//Esta ruta sirve traer los detalles especificos de un CLIENTE para mostrarlo en PROFILE
module.exports = {
    getInfo: function(req, res){
        const mail = req.body.mail || req.query.mail
        Client.findOne({
            where: {
                mail: mail
            }
        })
        .then(r=>{
            res.send(r)
        })
        .catch(()=>{
            res.send('Paso algo malo con la info personal...')
        })
    }
}
