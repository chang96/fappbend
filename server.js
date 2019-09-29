require('dotenv').config()
    //const telegram = require('telegram-bot-api');
const ind = require('./newtest')
const telegraf = require('telegraf');
const taapi = process.env.TAAPI
const token = '935256153:AAEpl7pwiov2O228UzGt9N2t6ZoEJWa-lsc' //process.env.TELE_BOT
const axios = require('axios')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bot = new telegraf(token)
const User = require('./model/user')
const Coin = require('./model/coin')
    //const tel = require('./command/telegram')
    //const pair = ['BTCUSDT', 'ETHUSDT', 'GVTETH', 'BNBETH', 'CELRETH', 'MATICETH', 'MATICUSDT', 'CELRUSDT', ]
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', function() {
    console.log('up!')
})

let tel = require('./command/telegram').tel(bot, Coin)

// let a = (async() => {
//     let b = await ind.founnd
//     console.log(b)
// })()

const save = async function(dat, t) {
        let data = await dat
        Coin.findOneAndUpdate({ 'mymyid': 'string' }, {
                [t]: data
            }, { useFindAndModify: false },
            async(err, coin) => {
                console.log('...................................')
                if (err)
                    return err

            }).then((d) => { console.log(`${t} saved`) })
    }
    //5m 15m 1h 4h // 1w
let search5 = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
        let b = await ind.founnd(size, volume, rs)
        console.log('5min')
        let c = await save(b, 't5m')
    })(size, volume)
    setTimeout(search15, 1000 * 60 * 3, '15m', 100000, 35)
}
let search15 = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
        let b = await ind.founnd(size, volume, rs)
        let c = await save(b, 't15m')
    })(size, volume)
    setTimeout(search1h, 1000 * 60 * 3, '1h', 100000, 35)
}
let search1h = function(size, volume, rs) {
    let a = (async(size, volume, rs) => {
        let b = await ind.founnd(size, volume, rs)
        let c = await save(b, 't1h')
    })(size, volume)
    setTimeout(search4h, 1000 * 60 * 3, '4h', 100000, 35)
}
let search4h = function(size, volume, rs) {
        let a = (async(size, volume, rs) => {
            let b = await ind.founnd(size, volume, rs)
            let c = await save(b, 't4h')
        })(size, volume)
        setTimeout(search4h, 1000 * 60 * 3, '5m', 100000, 35)
    }
    //setInterval(search15, 1000 * 60 * 20, '15m', 100000, 35)
setTimeout(search5, 1000 * 60 * 3, '5m', 100000, 35)
app.get('/', function(req, res) {
        res.send(`
    1) Access candles 5m, 15m, 1h, 4h. Update is every 15mins.
     /t5m to access 5min candle
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