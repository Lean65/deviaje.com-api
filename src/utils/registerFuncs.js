
const { Client, Passenger, Payment, Fly } = require('../db')
const nodemailer = require('../nodemailer')
const photo = 'https://st2.depositphotos.com/4492993/7247/v/950/depositphotos_72470597-stock-illustration-vector-airplane-travel-tourism.jpg'
const ranks = [
    [00, 10, '*'], 
    [10, 40, '**'], 
    [40, 80, '***'], 
    [80, 200, '****'], 
    [200, 501, '*****']
  ]

module.exports = {
    MailPurchaseConfirmation: (mail, name) => {
        return Client.findOne({where: {mail: mail}})
        .then(r=>{
            if(r){
                const mailOptions = {
                    from: 'servidor node.js',
                    to: mail,
                    subject: 'Successful Purchase',
                    html: 'Welcome to  deViaje.com <br>' + JSON.stringify(`Thanks for shopping  ${name} at  deViaje.com`),
                    attachments: [ { path: photo } ]
                }
                nodemailer.sendMail(mailOptions)
                return 'Mail enviado a la persona que pago'
                return r
            }
            else return 'Mail no enviado a la persona que pago'
        })
        .catch(e=>e)
    },

    PostPassengers: ( passengersInfo, usermail) => {
        // const { passengersInfo, usermail } = req.body
        return Client.findOne({ where: { mail: usermail } })        
        .then(r=>{
            if(r){
                const mailOptions = {
                    from: 'servidor node.js',
                    to: usermail,
                    subject: 'Tickets Information',
                    html: 'Tickets Information <br><br>' +
                    passengersInfo.map(p=>{
                        JSON.stringify(
                          `<h4>Name :</h4> ${p.name}` +
                            `<h4>Last Name :</h4> ${p.lastname}` +
                            `<h4>DNI :</h4> ${p.document}` +
                            `<h4>Birthday :</h4> ${p.birth}` +
                            `<h4>Nationality : </h4> ${p.country}` +
                            '<br>'
                        )
                    }),
                    attachments: [ { path:photo } ]
                }
                nodemailer.sendMail(mailOptions)
                return Promise.all(passengersInfo.map(e => Passenger.findOrCreate({
                            where: {document: e.document},
                            defaults: {
                                name: e.name,
                                lastname: e.lastname,
                                document: e.document,
                                birthday: e.birth,
                                country: e.country
                            }
                        })))
            }
            else return 'El usuario parece no estar registrado o algo asi'
        })
        .catch(e=>e)
    },

    PostPayment: (name, email, address, price) => {
        return Payment.create({
            mail: email,
            monto: price,
            name: name,
            address: address
        })
        // .then(r=>r)
        // .then(()=>'Info de pago registrada')
        .catch(()=>'No se registro el pago')
    },

    PostVuelos: vuelo => {
        const { cityCodeFrom, cityCodeTo, local_departure, local_arrival, cityFrom, cityTo, duration } = vuelo
        // 2022-04-20T21:20:00.000Z
        let timeA = local_arrival.slice(11, 16)
        let timeD = local_departure.slice(11, 16)
        let date = local_departure.slice(0, 10).split('-').reverse().join('/')
        return Fly.create({
            departure: cityCodeFrom,
            arrival: cityCodeTo,
            date,
            cityD: cityFrom,
            cityA: cityTo,
            timeD,
            timeA,
            duration: duration.total,
        })
        // .then(r=>'Vuelo registrado con exito')
        .catch(e=>'No se registro el vuelo porque ...' + e)
    },

    AddPoints: (mail, points) => {
        return Client.findOne({where: {mail: mail}})
        .then(p=>{
            let u = p.dataValues
            u.points += parseInt(points)
            let check = u.points > 500 ? 500 : u.points < 0 ? 0 : u.points
            let prevCategory = u.category
            u.category = ranks.find(e=>e[0] <= check && e[1] > check)[2]
            if(prevCategory !== u.category){
                nodemailer.sendMail({
                    from: 'servidor node.js',
                    to: u.mail,
                    subject: 'Subida de categoria!',
                    html:
                    JSON.stringify(
                        `Felicidades ${u.username} por subir a categoria ${u.category}`),
                    attachments: [
                    {path: photo}
                    ]
                })
            }
            // p.dataValues = u
            // console.log(u)
            // console.log(p)
            Client.update({ points: u.points, category: u.category}, {where: {mail: mail}})
            return 'Puntos agregados con exito'
        })
        .catch(e=>'No se pudieron agregar los puntos porque ' + e)
    }
}