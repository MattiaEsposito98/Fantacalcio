const express = require('express')
const router = express.Router()
const fantaRouter = require('../controllers/fantaCrontroller')

//homePage con i propietari e calciatori
router.get('/', fantaRouter.proprietari)

//aggiungere partecipanti
router.post('/', fantaRouter.AddPlayer)

//aggiungi calciatori
router.post('/calciatori', fantaRouter.addPlayerOfFootball)

//Delete Partecipante o calciatore
router.delete('/:type/:id', fantaRouter.removeGeneric)


module.exports = router