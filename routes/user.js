const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const configs = require('./../app/configs/configs')

var User = require('./../app/models/user')
mongoose.connect(configs.databaseLink)
var secretKey = configs.secret

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/register', function (req, res) {
  let userInfo = req.body
  let condition = {email: userInfo.email}
  User.findOne(condition, function (err, user) {
    if (err) {
      res.status(500).send(error)
    }
    if (user) {
      let data = {code: 1, message: 'Email exist'}
      res.send(data)
    } else {
      let newUser = new User()
      newUser.email =  userInfo.email,
      newUser.password = newUser.generateHashPassword(userInfo.password)
      newUser.save(function (err, user) {
        if (err) throw err
        else {
          let data = {code: 0, message: "Register Successfully"}
          res.send(data)
        }
      })
    }
  })
})

router.post('/login', function (req, res) {
  let userInfo = req.body
  let condition = {email: userInfo.email}
  User.findOne(condition, function (err, user) {
    if (err) {
      res.status(500).send(error)
    }
    let data = {code: 0, message : ''}
    if (user) {
      let validPassword = user.comparePassword(userInfo.password)
      if (validPassword) {
        let token = jwt.sign({user}, secretKey, {expiresIn: '24h'})
        data.token = token
        data.code = 0
        data.message = 'Login Successfully'
        res.send(data)
      } else {
        data.code = 1
        data.message = 'Your password is incorrect'
        res.send(data)
      }
    } else {
      data.code = 1
      data.message = 'Your username or password is incorrect'
      res.send(data)
    }
  })
})

router.use(function (req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        data = {code: 1, message: 'Failed to authenticate user'}
        return res.send(data)
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    data = {code: 1, message: 'No token provided'}
    return res.status(403).send(data)
  }
})

module.exports = router

