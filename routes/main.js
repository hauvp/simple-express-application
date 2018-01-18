const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.redirect('user/login')
})

router.get('*', function (req, res) {
  res.redirect('user/login')
})

module.exports = router