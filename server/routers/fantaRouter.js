const express = require('express')
const router = express.Router()
const fantaRouter = require('../controllers/fantaCrontroller')

//homePage con i propietari e calciatori
router.get('/', fantaRouter.proprietari)

module.exports = router