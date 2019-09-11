const words = require('./words.js').words;

// pick one at random
const word = words[Math.floor(Math.random() * words.length)]

console.log(word);