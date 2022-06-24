const express = require('express')
const router = express.Router()
const Url = require('../../models/Url')
const generateRandomCode = require('../../utils/generate_random_code')

// router: get homepage
router.get('/', (req, res) => {
  res.render('index')
})

// router: post an original URL to generate a shortened URL
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

// router: get the original URL via the shortened URL
router.get('/:randomCode', (req, res) => {
  const { randomCode } = req.params
  Url.findOne({ randomCode })
    .then(result => {
      result ? res.redirect(`${result.originalUrl}`) : res.render('404')
    })
    .catch(e => console.log(e))
})

module.exports = router