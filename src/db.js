require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env
//'postgres://user:pass@example.com:5432/dbname'
//Reemplazar el db al final por el nombre de la base de datos
const sequelize = new Sequelize(
  //postgres://user:pass@example.com:5432/dbname
  //tipo y user postgres://nmsjqlanayhjza:
  //password    38f8e70b764138a2844437a450675d8054f0dfc7ff583e528e07586364c3f237    @
  //host        ec2-52-18-116-67.eu-west-1.compute.amazonaws.com                    :
  //port        5432                                                                /
  //database    de2lirvfeel98j
  // process.env.DATABASE_URL ||
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fly`,
  {
    logging: false,
    native: false
  }
)
const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

//modelDefiners.forEach(model => model(sequelize))

let entries = Object.entries(sequelize.models)
let capsEntries = entries.map(entry => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1]
])
sequelize.models = Object.fromEntries(capsEntries)

//Traer todas las tablas
const { UsuarioBeta } = sequelize.models

//Relaciones entre las tablas

module.exports = {
  ...sequelize.models,
  conn: sequelize
}
