// require('dotenv').config()
// const telegram = require('telegram-bot-api');
// const token = '935256153:AAEpl7pwiov2O228UzGt9N2t6ZoEJWa-lsc' //process.env.TELE_BOT
// const api = new telegram({
//     token: token,
//     updates: {
//         enabled: true
//     }
// });
let find = function(User, data) {
    return User.findOne({ username: data.from.username }, function(err, user) {
        if (err)
            return err
        else if (user) return user
    }).then(user => user.hasAccess)
}
let anyone = true
module.exports.tel = function(bot, Coin, User, api) {
        bot.onText(/\/start/, function(msg) {
            let mess = `WELCOME! \n Taapibot is a trading assistant. It outputs coins with approximately rsi less than 35, macd crossing over and more than $100,000 in volume on binance. This bot updates approximately every 7 - 8minutes. PLEASE NOTE THAT THIS IS NOT A TRADING BOT AND THE COIN(S) LISTED ARE NOT GUARRANTEED TO GROW IN VALUE. PRECAUTIONS LIKE SETTING STOP LOSS & DOING YOUR OWN RESEARCH SHOULD STILL BE DONE. /help to get started \n
                        Happy longing!  \n feedback @Cha_ng or https://t.me/joinchat/EIARYk24KBxEiEosp-t9WQ`
            bot.sendMessage(msg.chat.id, mess)
        })
        bot.onText(/\/help/, function(msg) {
            let mess = `/15mcoins to access 15min candles
                /1hcoins to access 1h candles
                /4hcoins to access 4h candles `
            bot.sendMessage(msg.chat.id, mess)
        })
        bot.on('message', function(msg) {
            let t = msg.text === '/15mcoins' ? 't15m' : msg.text === '/1hcoins' ? 't1h' : msg.text === '/4hcoins' ? 't4h' : 'a'
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
                    let auth = ['Cha_ng']
                    if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1) {
                        bot.sendMessage(msg.chat.id, `coin:${a[t]}`)
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