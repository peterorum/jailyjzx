const fetch = require('node-fetch')
var Twit = require('twit')

const { words } = require('./words.js')

async function getMeaning(word) {
    const response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.dictionary_api_key}`
    )
    const json = await response.json()

    let meaning = ''

    if (json.length && json[0].shortdef) {
        const meanings = json.reduce((arr, m) => [...arr, ...m.shortdef], [])

        meaning = meanings[Math.floor(Math.random() * meanings.length)]
    }

    return meaning
}

async function post() {
    // pick one at random
    const word = words[Math.floor(Math.random() * words.length)]

    const meaning = await getMeaning(word)

    const text = meaning ? `${word}: ${meaning}` : word

    const T = new Twit({
        consumer_key: process.env.tw_jzx_consumer_key,
        consumer_secret: process.env.tw_jzx_consumer_secret,
        access_token: process.env.tw_jzx_oauth_token,
        access_token_secret: process.env.tw_jzx_oauth_token_secret
    })

    // tweet

    T.post('statuses/update', { status: text }, function(err) {
        if (err) {
            console.log(err)
        }
    })

    return word
}

// test - remove before deploying
// post()

// lambda
exports.handler = function(event, context, callback) {
    const word = post()

    callback(null, `posted ${word}`)
}
