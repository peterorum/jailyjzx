var Twit = require('twit')

const { words } = require('./words.js')

// pick one at random
const word = words[Math.floor(Math.random() * words.length)]

var T = new Twit({
    consumer_key: process.env.tw_jzx_consumer_key,
    consumer_secret: process.env.tw_jzx_consumer_secret,
    access_token: process.env.tw_jzx_oauth_token,
    access_token_secret: process.env.tw_jzx_oauth_token_secret
})

// tweet

T.post('statuses/update', { status: word }, function(err) {
    if (err) {
        console.log(err)
    }
})
