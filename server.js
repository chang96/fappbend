require('dotenv').config()
    //const telegram = require('telegram-bot-api');
const ind = require('./newtest')
const taapi = process.env.TAAPI
const axios = require('axios')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
    //const tel = require('./command/telegram')
    //const pair = ['BTCUSDT', 'ETHUSDT', 'GVTETH', 'BNBETH', 'CELRETH', 'MATICETH', 'MATICUSDT', 'CELRUSDT', ]
const PORT = process.env.PORT || 3000
    // mongoose.connect(process.env.URI, { useNewUrlParser: true })
    // const connection = mongoose.connection
    // connection.once('open', function() {
    //         console.log('up!')
    //     })
    // let a = (async() => {
    //     let b = await ind.founnd
    //     console.log(b)
    // })()

app.get('/getcoins/:volume', (req, res) => {
        try {
            let volume = Number(req.params.volume)
            console.log(typeof volume, 1)
            let size = req.query.size
            let a = (async(size, volume) => {
                let b = await ind.founnd(size, volume)
                console.log('yea')
                res.send(b)
                    //console.log(b)
            })(size, volume)
        } catch (err) {
            console.log(err)
        }
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