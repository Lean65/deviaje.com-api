const { Client } = require('../db')
const { Router } = require('express')
const router = Router()


module.exports = (req, res) => {
    // console.log('************')
    // console.log(req.body)
    // Client.findAll().then(resp=>{
        //     return resp.map(e=>e.dataValues)
        //     // console.log(resp)
        // })
        // .then(r=>r.find(e=>e.username === req.body.user))
        // .then(r=>r)
        
    const {birthday, verifiedmail, favs, points, user} = req.body
    Client.update({
        birthday: birthday,
        verifiedmail: verifiedmail,
        favs: favs,
        points: points
    }, { where: {username: user} })
    .then(r=>res.send('info actualizada en ' + user))
    .catch(e=>res.status(401).send(e))
}