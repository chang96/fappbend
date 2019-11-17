require('dotenv').config()
const telegram = require('telegram-bot-api');
const ind = require('./newtest')
const telegraf = require('telegraf');
const Bot = require('node-telegram-bot-api')
const taapi = process.env.TAAPI
const multi = require('./multicandles')
const token = '935256153:AAEpl7pwiov2O228UzGt9N2t6ZoEJWa-lsc' //process.env.TELE_BOT
const api = new telegram({ token: token })
module.exports.myapi = api
const axios = require('axios')
const mongoose = require('mongoose')
    //const Binance = require('binance-api-node')()

const binanceEx = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    // getTime: xxx // time generator function, optional, defaults to () => Date.now()
})

const express = require('express')
const eyo = require('./volume')
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
const otherUser = require('./model/otherUser')
const bodyParser = require('body-parser')
    // app.use(bot.webhookCallback('/49f0b2e1-2c27-4fe7-a08c-4d3bb43a3972'))
    // bot.telegram.setWebhook('https://webhook.site/49f0b2e1-2c27-4fe7-a08c-4d3bb43a3972')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//const pair = ['BTCUSDT', 'ETHUSDT', 'GVTETH', 'BNBETH', 'CELRETH', 'MATICETH', 'MATICUSDT', 'CELRUSDT', ]
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', function() {
    console.log('up!')
}).catch(err => { return err })

let tel = require('./command/telegram').tel(bot, Coin, User, api, otherUser)
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
const sortcoin = async function(coins) {
    let rgx1 = /BTC$/
    let rgx2 = /ETH$/
    let rgx3 = /USDT$/
    let coin = await coins
        //console.log(coin + '..........................................')
    return Promise.all(coin.map(async function(coi) {
        let co = await coi
        if (co.match(rgx1) || co.match(rgx2) || co.match(rgx3)) {
            return coi
        }
    })).then((arr) => {
        //let r = []
        return Promise.all(arr.filter(function(a) {
            if ((a !== undefined)) {
                return a
            }
            //return r
        }))
    })
}
const findSendme = async function(coins) {
    let coin = await coins
        //console.log(coin)
    let arr = ['t3m', 't5m', 't15m', 't30m', 't1h', 't4h', 't1d', 't1w']
    const rgx = /^t[0-9]/
        // const a = 't15m'
        // console.log(rgx.test(a))
    return Promise.all(arr.map(async function(ar) {
        //console.log(await sortcoin(coin[ar]))
        return {
            [ar]: await sortcoin(coin[ar])
        }
    }))

}
let arr2 = [
    { 't3m': ['BTCUSDT'] }, { 't5m': ['BTCUSDT'] },
    { 't15m': ['BTCUSDT'] }, { 't30m': ['BTCUSDT'] },
    { 't1h': ['BTCUSDT'] }, { 't4h': ['BTCUSDT'] }, { 't1d': ['BTCUSDT'] },
    { 't1w': ['ETHUSDT'] }
]
let tradds2 = []
const sendMe = async function() {
    await Coin.findOne({ mymyid: 'string' }, async function(err, coin) {
        let arr = ['t3m', 't5m', 't15m', 't30m', 't1h', 't4h', 't1d', 't1w']
        if (err) return err
        if (coin) {
            //console.log(findSendme(coin))
            //console.log(coin)
            //console.log(await findSendme(coin))
            let a = await findSendme(coin)
            let c = a.filter(function(e, i) {
                if (e[arr[i]].length > 0)
                    return e
            })
            let b = JSON.stringify(c)
            let arr1 = [...c]
                // function f(arr1) {

            //     let c = []
            //     arr1.forEach(function(obj, i) {
            //         console.log(obj)
            //         for (const key1 in obj) {
            //             obj[key1].forEach(function(e, j) {
            //                 console.log(arr1[i][key1] + '......... ' + i)
            //                 arr1[i] === undefined ? console.log('und') : c.push(e === arr2[i][key1])
            //             })
            //         }
            //     })
            //     arr2 = [...arr1]
            //     console.log(arr2 + '**************')
            //     return c.every(function(cee) {
            //         return cee == true
            //     })
            // }
            //if (b[1].length > 0 || b[2].length > 0 || b[3].length > 0 || b[4].length > 0)
            let tradds = multi.mutlti(arr1, 6, 't5m')

            if (multi.mutlti(arr1, 6, 't5m').length > 0 && !multi.changing(tradds2, tradds)) {
                tradds2 = tradds
                bot.sendMessage(954135852, `now: ${tradds}`)
            } else console.log(tradds)

        }
    })
}
setInterval(sendMe, 1000 * 60 * 0.6)
const findCoinToTrade = async() => {
    return Coin.findOne({ mymyid: 'string' }, async function(err, coin) {
        if (err) return err
        else if (coin) {
            return (coin)
        }
    })
}

async function filtering(a, time) {
    let filtered = []

    function removenonbtc(a) {
        return a.filter(function(c, i) {
            let regx = /BTC$/
            if (c.match(regx)) {
                return c
            }
        })
    }

    function removeColon(a) {
        return a.map(function(c, i) {
            let n = c.split('').length
            if (c.split('')[n - 1] == ':' && c.split('')[n - 2] == ':')
                return c.split('').splice(0, n - 3).join('')
            else return c
        })
    }
    let b = await a.forEach(function(c) {
        time.forEach(function(t) {
            c.hasOwnProperty(t) && c[t].length > 0 ? filtered.push({
                [t]: removenonbtc(removeColon(c[t]))
            }) : null
        })
    })
    return filtered
}

// let l = (async(time) => {

//     let availableFunds = {}
//     let a = await findSendme(findCoinToTrade())
//     let b = await filtering(a, time)
//         //let c = await biggestVolume(b)
//         // let funds = await binanceEx.balance(function(err, data) {
//         //     for (const coin in data) {
//         //         if (coin == 'BTC') {
//         //             availableFunds.BTC = data[coin].available
//         //         } else if (coin == 'ETH') {
//         //             availableFunds.ETH = data[coin].available
//         //         } else if (coin == 'USDT') {
//         //             availableFunds.USDT = data[coin].available
//         //         }
//         //     }
//         //     console.log(availableFunds)
//         // })
//     console.log(b)
// })(['t5m', 't15m', 't30m'])
const save = async function(dat, t) {
        let data = await dat
        Coin.findOneAndUpdate({ 'mymyid': 'string' }, {
                [t]: data,
                [`time${t}`]: new Date().toTimeString()
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
let count
    // let search3 = function(size, volume, rs) {
    //     let a = (async(size, volume, rs) => {
    //             let b = await ind.founnd(size, volume, rs)
    //             let c = await save(b, 't3m')
    //         })(size, volume, rs)
    //         //api.sendMessage({ chat_id: 954135852, text: 'saved 15m' })
    //     setTimeout(search5, 1000 * 60 * 3, '5m', 100000, rsii)
    // }
    // let search5 = function(size, volume, rs) {
    //     let a = (async(size, volume, rs) => {
    //             let b = await ind.founnd(size, volume, rs)
    //             let c = await save(b, 't5m')
    //         })(size, volume, rs)
    //         //api.sendMessage({ chat_id: 954135852, text: 'saved 15m' })
    //     setTimeout(search15, 1000 * 60 * 3, '15m', 100000, rsii)
    // }
let search3 = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd2(size, volume, rs)
            let c = await save(b, 't3m')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 15m' })
    setTimeout(search5, 1000 * 60 * 2, '5m', 100000, rsii)
}
let search5 = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd2(size, volume, rs)
            let c = await save(b, 't5m')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 15m' })
    setTimeout(search15, 1000 * 60 * 2, '15m', 100000, rsii)
}
let search15 = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd1(size, volume, rs)
            let c = await save(b, 't15m')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 15m' })
    setTimeout(search30, 1000 * 60 * 2, '30m', 100000, rsii)
}
let search30 = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd1(size, volume, rs)
            let c = await save(b, 't30m')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 1h' })
    setTimeout(search1h, 1000 * 60 * 2, '1h', 100000, rsii)
}

let search1h = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't1h')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 1h' })
    setTimeout(search4h, 1000 * 60 * 2, '4h', 100000, rsii)
}
let search4h = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't4h')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 4h' })
    setTimeout(search1d, 1000 * 60 * 2, '1d', 100000, rsii)
}
let search1d = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't1d')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 4h' })
    setTimeout(search1w, 1000 * 60 * 2, '1w', 100000, rsii)
}
search1w = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't1w')
        })(size, volume, rs)
        //api.sendMessage({ chat_id: 954135852, text: 'saved 4h' })
    setTimeout(search3, 1000 * 60 * 2, '3m', 100000, rsii)
}
setTimeout(search3, 1000 * 60 * 0.25, '3m', 100000, rsii)
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
app.get('/seeallother', function(req, res) {
    otherUser.find({}, function(err, users) {
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
    // timet30m: '', timet45m: '',
    //t30m: ['BTCUSDT'], t45m: ['BTCUSDT'],
    let stuff = { t5m: ['BTCUSDT'], t3m: ['BTCUSDT'], t15m: ['BTCUSDT'], t30m: ['BTCUSDT'], t1h: ['BTCUSDT'], t4h: ['BTCUSDT'], t1d: ['BTCUSDT'], t1w: ['BTCUSDT'], mymyid: 'string', timet3m: '', timet5m: '', timet15m: '', timet30m: '', timet1h: '', timet4h: '', timet1d: '', timet1w: '' }
    let c = new Coin(stuff)
    c.save().then((c) => { res.send(c) })
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