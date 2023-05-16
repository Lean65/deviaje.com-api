const router = require('express').Router()
const { Fly, Passenger, Client } = require('../db.js')
const { MailPurchaseConfirmation , PostPassengers, PostPayment, PostVuelos, AddPoints } = require('../utils/registerFuncs.js')

//  billingDetails = name, email, address
//  email     = El que paga
//  usermail  = El que esta registrado
//  address: { city: '123', line1: '123', state: '123', postal_code: '123' }

router.post('/', (req, res)=>{
    const { name, email, usermail, price, flight, passengersInfo, address} = req.body
    let points = Math.floor((flight.distance + flight.price)/1000)
    Promise.all([
        MailPurchaseConfirmation(usermail, name),
        PostPassengers(passengersInfo , usermail),
        PostPayment(name, email, address, price),
        PostVuelos(flight),
        AddPoints(usermail, points)
    ])
    .then(r=>{

        let arrPassengers = r[1]
        // console.log(r)
        // console.log(arrPassengers)
        // console.log(arrPassengers[0])
        let paymentInstance = r[2]
        let flyInstance = r[3]

        Promise.all([
            flyInstance.addPayment(paymentInstance), 
            Client.findOne({where:{mail:usermail}})
            .then(c=>flyInstance.addClient(c)),
            Promise.all(arrPassengers.map(e=>{
                // console.log(e)
                // console.log(e[0])
                return e[0].addFly(flyInstance)
            }))
        ])


        })
    .then(()=>res.send('Todo registando'))
    .catch(e=>res.send('Algo malio sal con ... ' + e ))
})
module.exports = router


      //Hacer las relaciones


              // console.log(arrPassangers)
        // arrPassangers.map(p=>{
        //     // console.log(p)
        //     return Passenger.findOne({where: {document: p.document}})
        //     .then(re=>{
        //         console.log(re)
        //         return 1
        //     })
            // .then(resp=>resp.addFly(flyInstance))
            // .then(resp=>flyInstance.addPassenger(resp))