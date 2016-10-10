const PORT = 8000

// REQUIRES
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const todos = require('./routes/todosRoutes')

// APP DECLARATION
const app = express()

// MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES
app.use('/todos', todos)

// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`)
})
