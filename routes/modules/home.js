const router = require('express').Router()
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
    .then(async result => {
      // if the originalUrl exists, store its randomCode and stop the function
      if (result) return randomCode = result.randomCode
      // else generate and store a new randomCode
      try {
        randomCode = await generateRandomCode(5)
        return Url.create({ originalUrl, randomCode })
      } catch (e) {
        console.log(e)
      }
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
      // if the router doesn't exist, render 404 error page
      result ? res.redirect(`${result.originalUrl}`) : res.status(404).render('404')
    })
    .catch(e => console.log(e))
})

module.exports = router