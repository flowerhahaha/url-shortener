const express = require('express')
const router = express.Router()
const Url = require('../../models/url')

// set router: get homepage
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router