const express = require('express')
const fs = require('fs')
const router = express.Router()


const PATH_ROUTES = __dirname

const removeExtension = filename => {
  return filename.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter(file => {
  router.get('/', (req, res)=>{
    res.send('estas en main')
  })
  const name = removeExtension(file)

  if (name != 'index') {
    router.get(`/${name}`, require(`./${file}`))
  }
})

module.exports = router
