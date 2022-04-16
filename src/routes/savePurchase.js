const router = require('express')()
// const { getUsers } = require('../controllers/getUsers')
const { Compras, Client } = require('../db.js')

router.get('/', (req, res)=>{
    //req.body = citycodefrom, citycodeto, local_departure, user/mail


    
    const email = 'leandromelerio@gmail.com'
    Client.findOne({where: {mail: email}})
    .then(r => 
        r.createCompra({
            citycodefrom:'MDQ',
            citycodeto:'BAR',
            local_departure:'13/04/1992'
        }) 
    )
    .then(()=>{
        res.send('guardando compra')
    })
    .catch(()=>res.status(408).send('algo malio sal'))
})

module.exports = router