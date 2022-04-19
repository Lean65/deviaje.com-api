const router = require('express').Router()
// const { Fly, Passenger } = require('../db.js')
const { MailPurchaseConfirmation , PostPassengers, PostPayment, PostVuelos } = require('../utils/registerFuncs.js')

// billingDetails = name, email, address
//email     = El que paga
//usermail  = El que esta registrado
// address: { city: '123', line1: '123', state: '123', postal_code: '123' }

router.post('/', (req, res)=>{
    const { name, email, usermail, price, flight, passengersInfo, address} = req.body
    // const { city, line1, state, postal_code } = req.body.address
    // console.log([name, email, usermail, price, flight, city, line1, state, postal_code, passengersInfo])
    // console.log(email)
    // console.log(usermail)
    Promise.all([
        MailPurchaseConfirmation(usermail, name),
        PostPassengers(passengersInfo , usermail),
        PostPayment(name, email, address, price),
        PostVuelos(flight)
    ])
    .then(r=>{
        console.log(r)
        res.send('Todo registando')
    })
    .catch(e=>res.send('Algo malio sal con ... ' + e ))
})
module.exports = router

      //Funcion que registre el flight
      //Hacer las relaciones