const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.port || 8080

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', './views')

var user = require('./routes/user.js')
var project = require('./routes/project')
var main = require('./routes/main')

app.use('/user', user)
app.use('/project', project)
app.use('', main)

app.listen(port, function () {
  console.log('App listening on port: %s', port)
})

module.exports = app
