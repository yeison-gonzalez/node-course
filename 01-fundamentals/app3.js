const fs = require('fs')

const content = fs.readFileSync('README.md', 'utf8')
const regex = new RegExp('React', 'gi')

const words = content.split(' ')

// MY SOLUTION
const reactWordCount = words.filter(item => regex.exec(item))?.length

// OTHER SOLUTION
const otherReactWordCount = content.match(regex)?.length

console.log('Palabras: ', content.length)
console.log('Palabras react: ', reactWordCount)
console.log('Palabras react: ', otherReactWordCount)
