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
module.exports.tel = function(bot, Coin, User) {

        bot.on('message', function(msg) {
            Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
                if (err)
                    return err
                else return coin
            }).then((datum) => {
                let data = msg
                console.log(data)
                let auth = ['Cha_ng']
                if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1) {
                    bot.sendMssage(msg.chat.id, datum.t5m)
                } else {
                    bot.sendMssage(msg.chat.id, 'array of coin')
                }
            })

        });

        // bot.command('/5mcoins', function(msg) {
        //     Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
        //         if (err)
        //             return err
        //         else return coin
        //     }).then((datum) => {
        //         let data = msg.message
        //         console.log(data)
        //         let auth = ['Cha_ng']
        //         if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1) {
        //             msg.reply(datum.t5m)
        //         } else {
        //             msg.reply('array of coin')
        //         }
        //     })

        // });
        // bot.command('/15mcoins', function(msg) {
        //     Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
        //         if (err)
        //             return err
        //         else return coin
        //     }).then((datum) => {
        //         let data = msg.message
        //         let auth = ['Cha_ng']
        //         if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1) {
        //             msg.reply(datum.t15m)
        //         } else {
        //             msg.reply('array of coin')
        //         }
        //     })

        // });
        // bot.command('/1hcoins', function(msg) {
        //     Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
        //         if (err)
        //             return err
        //         else return coin
        //     }).then((datum) => {
        //         let data = msg.message
        //         let auth = ['Cha_ng']
        //         if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1) {
        //             msg.reply(datum.t1h)
        //         } else {
        //             msg.reply('array of coin')
        //         }
        //     })

        // });
        // bot.command('/4hcoins', function(msg) {
        //     Coin.findOne({ 'mymyid': 'string' }, function(err, coin) {
        //         if (err)
        //             return err
        //         else return coin
        //     }).then((datum) => {
        //         let data = msg.message
        //         let auth = ['Cha_ng']
        //         if (find(User, data) || auth.indexOf(`${data.from.username}`) !== -1) {
        //             msg.reply(datum.t4h)
        //         } else {
        //             msg.reply('array of coin')
        //         }
        //     })

        // });
        // bot.startPolling()
    }
    // module.exports.sending = async function(text) {
    //         let a = await text
    //         api.sendMessage({
    //             chat_id: 307237218,
    //             text: a
    //         })
    //     }
    //console.log('starting....')