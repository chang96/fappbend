require('dotenv').config()
const telegram = require('telegram-bot-api');
const ind = require('./newtest')
const telegraf = require('telegraf');
const Bot = require('node-telegram-bot-api')
const taapi = process.env.TAAPI
const token = '935256153:AAEpl7pwiov2O228UzGt9N2t6ZoEJWa-lsc' //process.env.TELE_BOT
const api = new telegram({ token: token })
const axios = require('axios')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
    //const bot = new telegraf(token)
let bot
if (process.env.NODE_ENV === 'production') {
    bot = new Bot(token);
    bot.setWebHook('https://shrouded-beach-91632.herokuapp.com/' + bot.token);
} else {
    bot = new Bot(token, { polling: true });
}
const User = require('./model/user')
const Coin = require('./model/coin')
const bodyParser = require('body-parser')
    // app.use(bot.webhookCallback('/49f0b2e1-2c27-4fe7-a08c-4d3bb43a3972'))
    // bot.telegram.setWebhook('https://webhook.site/49f0b2e1-2c27-4fe7-a08c-4d3bb43a3972')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//const pair = ['BTCUSDT', 'ETHUSDT', 'GVTETH', 'BNBETH', 'CELRETH', 'MATICETH', 'MATICUSDT', 'CELRUSDT', ]
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', function() {
    console.log('up!')
}).catch(err => { return err })

let tel = require('./command/telegram').tel(bot, Coin, User, api)
    // let a = (async() => {
    //     let b = await ind.founnd
    //     console.log(b)
    // })()
function checking() {

    User.updateMany({ 'time': { $lt: Date.now() - (1000 * 60 * 60 * 24 * 30) } }, { '$set': { "hasAccess": false } }, function(err, doc) {
        if (err) return err
        else if (doc) {
            //console.log(doc)
        }
    })
}
const save = async function(dat, t) {
        let data = await dat
        Coin.findOneAndUpdate({ 'mymyid': 'string' }, {
                [t]: data,
                [`time${t}`]: new Date().toLocaleTimeString()
            }, { useFindAndModify: false },
            async(err, coin) => {
                console.log('...................................')
                if (err)
                    return err

            }).then((d) => { console.log(`${t} saved`) })
    }
    //5m 15m 1h 4h // 1w
    // let search5 = function(size, volume, rs) {
    //         let a = (async(size, volume, rs) => {
    //                 let b = await ind.founnd(size, volume, rs)
    //                 console.log('5min')
    //                 let c = await save(b, 't5m')
    //                 checking()
    //             })(size, volume)
    //             //
    //         setTimeout(search15, 1000 * 60 * 2, '15m', 100000, 35)
    //     }
    // let search5mstar = function(size, volume, rs) {
    //     let a = (async(size, volume, rs) => {
    //             let b = await ind.founnd(size, volume, rs)
    //             console.log('5min')
    //             let c = await save(b, 't5m')
    //             checking()
    //         })(size, volume)
    //         //api.sendMessage({ chat_id: 954135852, text: 'saved 5m' })
    //     setTimeout(search15, 1000 * 60 * 3, '15m', 100000, 35)
    // }
const rsii = 35
let search15 = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't15m')
        })(size, volume)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 15m' })
    setTimeout(search1h, 1000 * 60 * 3, '1h', 100000, rsii)
}
let search1h = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't1h')
        })(size, volume)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 1h' })
    setTimeout(search4h, 1000 * 60 * 3, '4h', 100000, rsii)
}
let search4h = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't4h')
        })(size, volume)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 4h' })
    setTimeout(search15, 1000 * 60 * 3, '15m', 100000, rsii)
}
setTimeout(search15, 1000 * 60 * 3, '15m', 100000, rsii)
app.get('/', function(req, res) {
        res.send(`
    1) Access candles 15m, 1h, 4h. Update is every 6mins.
     /t15m to access 15min candle
    `)
    })
    // app.get('/getcoins/:volume', (req, res) => {
    //     try {
    //         let volume = Number(req.params.volume)
    //         console.log(typeof volume, 1)
    //         let size = req.query.size
    //         let rs = req.query.rsi
    //         let a = (async(size, volume, rs) => {
    //             let b = await ind.founnd(size, volume, rs)
    //             console.log('yea')
    //             res.send(b)
    //                 //console.log(b)
    //         })(size, volume, rs)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })
app.get('/seeall', function(req, res) {
    User.find({}, function(err, users) {
        if (err) return err
        else {
            res.send(users)
        }
    })
})
app.post('/' + token, function(req, res) {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
app.post('/seeuser', function(req, res) {
    let username = req.body.username
    User.findOne({ username: username }, function(err, user) {
        if (err) return err
        if (user) res.send(user)
        else return null
    })
})
app.post('/adduser', function(req, res) {
    let username = req.body.username
    let paid = req.body.paid
    User.findOne({ username: username }, function(err, user) {
        if (err) return err
        if (user) {
            res.send('username already exists')
        } else {
            let newUser = new User({ username: username, paid: [paid] })
            newUser.save().then(() => {
                res.send(`${username} created`)
            })
        }
    })

})
app.post('/removeuser', function(req, res) {
    const username = req.body.username
    User.findOneAndDelete({ username: username }, function(err, n) {
        if (err) return err
        else {
            res.send('done')
        }
    })
})
app.post('/updateuser', function(req, res) {
    let username = req.body.username
    let paid = req.body.paid
    User.findOneAndUpdate({ username: username }, { time: Date.now(), paid: paid.push(paid) }, function(err, doc) {
        if (err) return err
    }).then(() => {
        res.send(`${username} updated`)
    })
})
app.get('/coins/:t', function(req, res) {
    let t = req.params.t
    console.log(t)
    Coin.findOne({ 'mymyid': 'string' }, (err, coin) => {
        if (err) return err
        if (coin) {
            console.log(coin[t])
            res.send(coin[t])
        }
    })
})
app.get('/delete', function(req, res) {
    Coin.deleteMany({}, function(err, r) {
        if (err) console.log(err)
        else res.send('deleted')
    })
})
app.get('/find', function(req, res) {

    Coin.find({}, function(err, coin) {
        if (coin)
            res.send(coin)
    })
})
app.get('/saving', function(req, res) {
    let stuff = { t5m: ['BTCUSDT'], t15m: ['BTCUSDT'], t1h: ['BTCUSDT'], t4h: ['BTCUSDT'], mymyid: 'string' }
    let c = new Coin(stuff)
    c.save().then(console.log)
})
let a = 't1m'
app.get('/finding', function(req, res) {
        Coin.findOneAndUpdate({ 'mymyid': 'string' }, {
            [a]: ['ETHETH']
        }, { useFindAndModify: false }, function(err, coin) {
            if (err) return err
        }).then((coin) => res.send(coin))
    })
    // app.get('/store', function(req, res) {
    //     let a = (async() => {
    //         let b = await ind.find('15m', 1000000)
    //         console.log('yea')
    //             //res.send(b)
    //             //console.log(b)
    //     })()
    // })

// let sendit = (async function() {
//     let b = await ind.founnd
//     tel.sending('')
// })

//setTimeout(sendit, 5000)

// const api = new telegram({
//     token: process.env.TELE_BOT,
//     updates: {
//         enabled: true
//     }
// });
// api.on('message', function(message) {
//     // Received text message
//     console.log(message);
// });


//console.log('starting....')

app.listen(PORT, () => { console.log(`port ${PORT} is a go`) })