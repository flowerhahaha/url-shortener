// generate random code according to given length with numbers, lower case and upper case letters 
function generateRandomCode(length) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '0123456789'
  const letters = lowerCaseLetters + upperCaseLetters + numbers
  let randomCode = ''
  for (let i = 0; i < length; i++) {
    randomCode += letters[Math.floor(Math.random() * letters.length)]
  }
  return randomCode
}

module.exports = generateRandomCode