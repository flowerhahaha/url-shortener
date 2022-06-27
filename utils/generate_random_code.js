const Url = require('../models/Url')

// generate unique random code according to given length with numbers, lower case and upper case letters 
async function generateRandomCode(length) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '0123456789'
  const letters = lowerCaseLetters + upperCaseLetters + numbers
  let randomCode = ''
  for (let i = 0; i < length; i++) {
    randomCode += letters[Math.floor(Math.random() * letters.length)]
  }
  // if the randomCode exists, generate a new one, else return the randomCode
  try {
    const result = await Url.exists({ randomCode })
    return result ? generateRandomCode(length) : randomCode
  } catch (e) {
    console.log(e)
  }
}

module.exports = generateRandomCode