const { Router } = require('express')
const router = Router()
const { getCityInfo } = require('../controllers/getCityInfo')

//Se puede usar para buscar localizaciones pasando el nombre de una ciudad como "term", alternativamente un type que se
//usaria para filtrar resultados
router.get('/', getCityInfo)

module.exports = router
