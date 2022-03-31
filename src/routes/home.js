const express = require('express')
const router = express.Router()

const fun = (req, res)=>{
    res.send('todo ok en home del comp')
}

router.get('/home', fun)

module.exports = router