const express = require('express')
const router = express.Router()

var users = [
  {email: 'admin@bh.com', password: 'bh@132'},
  {email: 'admin1@bh.com', password: '123456'}
]

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login', function (req, res) {
  var userInfo = req.body
  var found = users.find((user) => {
    return (userInfo.email === user.email && userInfo.password === user.password)
  })
  if (found) {
    var data = {
      'code': 0,
      'type': 'success',
      'message': 'Login successfully'
    }
    res.send(data)
  } else {
    var errorData = {
      'code': 1,
      'type': 'failure',
      'message': 'Your email or password is incorrect'
    }
    res.status(404)
    res.send(errorData)
  }
})

module.exports = router

