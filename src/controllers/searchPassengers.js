const { Passenger } = require('../db.js')
const { handleHttpError } = require('../utils/handleError')

//Esta ruta sirve para devolver un array de PASAJEROS cuyos nombres incluyan el string NAME
//que se puede recibir por query o por body
module.exports = {
  getInfo: function (req, res) {
    const name = req.body.name || req.query.name
    //console.log(name)
    if(!name){
      Passenger.findAll()
      .then(r=>{
        return res.send(r)
      })
    } 
    Passenger.findAll()
      .then(r =>
        res.send(
          r.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
        )
      )
      .catch(() => {
        return handleHttpError(res, 'ERROR_PASSENGER_DO_NOT_FOUND')
        //res.send('Paso algo malo con la info personal...')
      })
  }
}
