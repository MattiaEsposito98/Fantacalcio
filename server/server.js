const express = require('express')
const app = express()
const port = 3000
const fantaRouter = require('./routers/fantaRouter')
const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')

app.get('/', (req, res) => {
  res.send('Fantacalcio')
})


//Rotta
app.use('/api/fantacalcio', fantaRouter)


//Middlewares per errori
app.use(errorsHandler)
app.use(notFound)


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})