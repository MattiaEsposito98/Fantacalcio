const express = require('express')
const router = express.Router()
const fantaRouter = require('../controllers/fantaCrontroller')

//homePage con i propietari e calciatori
router.get('/', fantaRouter.proprietari)

//aggiungere partecipanti
router.post('/', fantaRouter.AddPlayer)

//Delete
router.delete('/:id', fantaRouter.remove)

module.exports = router