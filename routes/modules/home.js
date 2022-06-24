const express = require('express')
const router = express.Router()
const Url = require('../../models/Url')
const generateRandomCode = require('../../utils/generate_random_code')

// router: get homepage
router.get('/', (req, res) => {
  res.render('index')
})

// router: post original URL to get shortened URL
router.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl.trim()
  let randomCode = ''
  Url.findOne({ originalUrl })
    .then(result => {
      randomCode = result ? result.randomCode : generateRandomCode(5)
      if (!result) return Url.create({ originalUrl, randomCode })
    })
    .then(() => {
      const shortenedUrl = `http://${req.headers.host}/${randomCode}`
      res.render('index', { shortenedUrl, originalUrl })
    })
    .catch(e => console.log(e))
})

module.exports = router