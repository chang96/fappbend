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
        }
    })
    return a
}
let anyone = true
module.exports.tel = function(bot, Coin, User, api) {
        bot.onText(/\/start/, function(msg) {
            let mess = `WELCOME! \n Tabot is a trading assistant. It outputs coins with approximately rsi less than 35, macd crossing over and more than $100,000 in volume on binance. This bot updates approximately every 10 - 12 minutes. PLEASE NOTE THAT THIS IS NOT A TRADING BOT AND THE COIN(S) LISTED ARE NOT GUARRANTEED TO GROW IN VALUE. PRECAUTIONS LIKE SETTING STOP LOSS & DOING YOUR OWN RESEARCH SHOULD STILL BE DONE. /help to get started \n
                        Happy longing!  \n feedback @Cha_ng or https://t.me/joinchat/EIARYk24KBxEiEosp-t9WQ`
            bot.sendMessage(msg.chat.id, mess)
        })
        bot.onText(/\/help/, function(msg) {
            let mess = ` /1hcoins to access 1h candles \n /4hcoins to access 4h candles\n /1dcoins to access 1d candles\n /1wcoins to access 1w candles \n\n pairs with ':' have their MACD crossing over or close to crossing \n pairs with nothing have relatively low rsi and macd ticking up \n pairs with ':::' have low rsi and macd crossing over`
            bot.sendMessage(msg.chat.id, mess)
        })
        bot.on('message', function(msg) {
            let t = msg.text === '/1hcoins' ? 't1h' : msg.text === '/4hcoins' ? 't4h' : msg.text === '/1dcoins' ? 't1d' : msg.text === '/1wcoins' ? 't1w' : 'a'
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
                    let c = await find(User, data)
                    console.log(c.hasAccess)
                    if (c === true) {
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