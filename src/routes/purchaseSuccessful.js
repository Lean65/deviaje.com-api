const router = require('express')()
// const { postUser } = require('../controllers/postUser')

router.get('/', (req, res)=>{

    res.send('get purchase successful')
})
router.post('/', (req, res)=>{
    res.send('post purchase successful')
})

module.exports = router