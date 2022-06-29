const Url = require('../models/url')

// generate unique random code according to given length with numbers, lower case and upper case letters 
async function generateUniqueRandomCodeForUrlCollection(length) {
  // take way '01olOI' to avoid confusion
  const letters = 'abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ23456789'
  let randomCode = ''
  for (let i = 0; i < length; i++) {
    randomCode += letters[Math.floor(Math.random() * letters.length)]
  }
  // if the randomCode exists, generate a new one, else return the randomCode
  try {
    const result = await Url.exists({ randomCode })
    return result ? generateUniqueRandomCodeForUrlCollection(length) : randomCode
  } catch (e) {
    console.log(e)
  }
}

module.exports = generateUniqueRandomCodeForUrlCollection