const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const generateRandomCode = require('../../utils/generate_random_code')

// set router: get homepage
router.get('/', (req, res) => {
  res.render('index')
})

// set router: post original URL
router.post('/', (req, res) => {
  const { originalUrl } = req.body
  const randomCode = generateRandomCode(5)
  const shortenedUrl = `http://${req.headers.host}/${randomCode}`
  res.render('index', { shortenedUrl, originalUrl })
})

module.exports = router