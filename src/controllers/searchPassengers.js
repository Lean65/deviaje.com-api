const { Passenger } = require('../db.js')

//Esta ruta sirve para devolver un array de PASAJEROS cuyos nombres incluyan el string NAME
//que se puede recibir por query o por body
module.exports = {
    getInfo: function(req, res){
        const name = req.body.name || req.query.name
        console.log(name)
        Passenger.findAll()
        .then(r=>res.send(r.filter(u=>u.name.toLowerCase().includes(name.toLowerCase()))))
        .catch(()=>{
            res.send('Paso algo malo con la info personal...')
        })
    }
}