const express = require('express')
const app = express()
const port = 3000
const fantaRouter = require('./routers/fantaRouter')

app.get('/', (req, res) => {
  res.send('Fantacalcio')
})

//Rotta
app.use('/api/fantacalcio', fantaRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})