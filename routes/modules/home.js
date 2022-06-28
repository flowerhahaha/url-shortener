const router = require('express').Router()
const Url = require('../../models/url')
const generateUniqueRandomCodeForUrlCollection = require('../../utils/generate_unique_random_code')

// router: get homepage
router.get('/', (req, res) => {
  res.render('index')
})

// router: post an original URL to generate a shortened URL
router.post('/', async (req, res) => {
  const originalUrl = req.body.originalUrl.trim()
  try {
    let randomCode = ''
    const urlData = await Url.findOne({ originalUrl })  
    // if the originalUrl exists, store its randomCode
    if (urlData) {
      randomCode = urlData.randomCode
      // else generate and store a new randomCode
    } else {
      randomCode = await generateUniqueRandomCodeForUrlCollection(5)
      await Url.create({ originalUrl, randomCode })
    }
    const shortenedUrl = `http://${req.headers.host}/${randomCode}`
    res.render('index', { shortenedUrl, originalUrl })    
  } catch (e) {
    console.log(e)
  }
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