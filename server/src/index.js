const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 5000
const db = require('./queries')

// app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`APP running on port ${port}`)
})

app.get('/', (request, response) => {
  // response.json({
  //     info: 'Node.js, express, postgres'
  // })
  console.log("test info!")
  console.log("got home directory request!")
  response.send({
    express: 'Node.js, express, postgres'
  })
})
app.get('/users', db.getUsers)