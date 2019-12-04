// require('dotenv').config()
// const telegram = require('telegram-bot-api');
// const token = '935256153:AAEpl7pwiov2O228UzGt9N2t6ZoEJWa-lsc' //process.env.TELE_BOT
// const api = new telegram({
//     token: token,
//     updates: {
//         enabled: true
//     }
// });
let find = async function(User, data) {
    let a = await User.findOne({ username: data.from.username }, async function(err, user) {
        if (err)
            return err
        else if (user) {
            //console.log(user)
            //let u = await user
            return user
        } else if (!user) {
            return false
        } else {
            return false
        }
    })
    return a
}

let see = async function(otherUser, data) {
    let b = await otherUser.findOne({ username: data.from.username }, async function(err, otheruser) {
        if (err) return err
        else if (otheruser) {
            console.log('user present')
            return 1
        } else {
            console.log('user not here')
            let oUser = new otherUser({ username: data.from.username, date: new Date().toDateString() })
            oUser.save().then(user => 1)

        }
    })
    return b
}
let anyone = true
module.exports.tel = function(bot, Coin, User, api, otherUser) {
        bot.onText(/\/start/, function(msg) {
            let mess = `WELCOME! \n Tabot is a trading assistant. It outputs coins crossing 55 period ema, macd crossing over and coins with more than $200,000 in volume on binance. This bot updates approximately every 2 - 5 minutes. PLEASE NOTE THAT THIS IS NOT A TRADING BOT AND THE COIN(S) LISTED ARE NOT GUARRANTEED TO GROW IN VALUE. PRECAUTIONS LIKE SETTING STOP LOSS & DOING YOUR OWN RESEARCH SHOULD STILL BE DONE. /help to get started \n
                        Happy longing!  \n feedback @Cha_ng or https://t.me/joinchat/EIARYk24KBxEiEosp-t9WQ`
            bot.sendMessage(msg.chat.id, mess)
        })
        bot.onText(/\/help/, function(msg) {
            let mess = `/1mcoins to access 1m candles \n/3mcoins to access 3m candles\n/5mcoins to access 5m candles\n/15mcoins to access 15m candles\n/30mcoins to access 30m candles\n/1hcoins to access 1h candles\n/4hcoins to access 4h candles\n/1dcoins to access 1d candles\n/1wcoins to access 1w candles \n\n\n All pairs are crossing their 55 period EMA and have their macd historgram ticking up`
            bot.sendMessage(msg.chat.id, mess)
        })
        bot.on('message', function(msg) {
            let t = msg.text === '/1mcoins' ? 't1m' : msg.text === '/3mcoins' ? 't3m' : msg.text === '/5mcoins' ? 't5m' : msg.text === '/15mcoins' ? 't15m' : msg.text === '/30mcoins' ? 't30m' : msg.text === '/1hcoins' ? 't1h' : msg.text === '/4hcoins' ? 't4h' : msg.text === '/1dcoins' ? 't1d' : msg.text === '/1wcoins' ? 't1w' : 'a'
            if (t === 'a') {
                console.log('ok')
            } else {
                Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
                    if (err)
                        return err
                    else return coin
                }).then(async(datum) => {
                    let data = msg
                    let a = await datum
                        //let auth = ['Cha_ng']
                        //if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1) {
                        //if (anyone) {
                        //console.log(find(User, data))
                    let z = await see(otherUser, data)
                    let c = await find(User, data)
                    console.log(c)
                    if (anyone) {
                        let u = `time${t}`
                            //console.log(u)
                        bot.sendMessage(msg.chat.id, `lastupdated: ${a[u]}\ncoin:${a[t]}`)
                    } else if (c == null) bot.sendMessage(msg.chat.id, 'subscribe to have access to the candles')
                    else if (c.hasAccess == true) {
                        let u = `time${t}`
                            //console.log(u)
                        bot.sendMessage(msg.chat.id, `lastupdated: ${a[u]}\ncoin:${a[t]}`)
                    } else {
                        bot.sendMessage(msg.chat.id, 'array of coin')
                    }
                })
            }

        });
        // bot.onText(/\/15mcoins/, function(msg) {
        //     Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
        //         if (err)
        //             return err
        //         else return coin
        //     }).then(async(datum) => {
        //         let data = msg
        //         let a = await datum
        //         let auth = ['Cha_ng']
        //             //if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1 || anyone) {
        //         if (anyone) {
        //             api.sendMessage(msg.chat.id, `coin:${a.t15m}`)
        //         } else {
        //             api.sendMessage(msg.chat.id, 'array of coin')
        //         }
        //     })

        // });

        // bot.onText(/\/1hcoins/, function(msg) {
        //     Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
        //         if (err)
        //             return err
        //         else return coin
        //     }).then(async(datum) => {
        //         let data = msg
        //         let a = await datum
        //         let auth = ['Cha_ng']
        //         if (anyone) {
        //             api.sendMessage(msg.chat.id, `coin:${a.t1h}`)
        //         } else {
        //             api.sendMessage(msg.chat.id, 'array of coin')
        //         }
        //     })

        // });
        // bot.onText(/\/4hcoins/, function(msg) {
        //     Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
        //         if (err)
        //             return err
        //         else return coin
        //     }).then(async(datum) => {
        //         let data = msg
        //         let a = await datum
        //         let auth = ['Cha_ng']
        //         if (anyone) {
        //             api.sendMessage(msg.chat.id, `coin:${a.t4h}`)
        //         } else {
        //             api.sendMessage(msg.chat.id, 'array of coin')
        //         }
        //     })

        // });
    }
    // module.exports.sending = async function(text) {
    //         let a = await text
    //         api.sendMessage({
    //             chat_id: 307237218,
    //             text: a
    //         })
    //     }
    //console.log('starting....')