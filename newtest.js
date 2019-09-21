require('dotenv').config()
const tulind = require('tulind')
const mymacd = require('./taapi/index')
const axios = require('axios')
const Binance = require('binance-api-node').default
const binance = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    useServerTime: true
})
const eyo = require('./volume')

// Authenticated client, can make signed calls
const bi = Binance({
        apiKey: process.env.APIKEY,
        apiSecret: process.env.APISECRET,
        // getTime: xxx // time generator function, optional, defaults to () => Date.now()
    })
    // const rgETH = /[ETH]$/
    // const eyo = bi.exchangeInfo().then(time => (time.symbols)).then(coins => {
    //     return coins.filter(function(coin) {
    //         //let num = coin.symbol.split('').length
    //         if (coin.symbol.match(rgETH))
    //             return coin

//     })
// }).then(coins => coins.map(coin => coin.symbol))

let find = async(size, volume) => {
        console.log(4)
        let arr = []
            //let eyoarr = await eyo
        let eyoarr = await eyo.volumeCheck(volume)
        return Promise.all(
            eyoarr.map(async function(eyo) {
                // let a = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=1h&limit=32`).
                // then(data => data.data).then(data => data.map(datum => (datum[4])))
                // let a1 = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=1h&limit=32`).
                // then(data => data.data).then(data => data.map(datum => (datum[4])))
                // let a2 = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=1h&limit=32`).
                // then(data => data.data).then(data => data.map(datum => (datum[4])))
                // let b = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=1h&limit=32`).
                // then(data => data.data).then(data => data.map(datum => (datum[2])))
                // let c = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=1h&limit=32`).
                // then(data => data.data).then(data => data.map(datum => (datum[3])))
                // let d = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=${size}&limit=500`).
                // then(data => data.data).then(data => data.map(datum => (datum[4])))
                let close100 = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=${size}&limit=500`).
                then(data => data.data).then(data => data.map(datum => (datum[4])));
                // let close200 = axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo}&interval=${size}&limit=500`).
                // then(data => data.data).then(data => data.map(datum => (datum[4])));
                // arr.push({ name: eyo, pip100: close100, pip200: close200 })
                //     // arr.push({ name: eyo, val: a, val1: b, val2: c, val3: d, pip100: close100, pip200: close200 })
                // return arr
                //return { name: eyo, pip100: close100, pip200: close200, rsi: d }
                return { name: eyo, pip100: close100 }
            })).catch(err => console.log(err))

    }
    //(a[0][6] - a[1][6]) >= -0.9 * a[0][6] && (a[0][6] - a[1][6]) <= 0.7 && a[2][6] > -25 && b[0][17] < 40 && c[0][14] < c[1][14] && c[0][14] < 30
    // const testing = function(a) {
    //     if (a[0] <= 0 && a[1] <= 0 && a[2] <= 0 && a[3] <= 0 && a[4] <= 0 && a[5] <= 0 && a[6] >= 0)
    //         return true
    //     else return false
    // }
function testing(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 2] < 0) {
        return true
    } else {
        return false
    }
}
let found = async(size, volume) => {
    let arr = []
    console.log(3)
    let candles = await find(size, volume)
        //console.log(candles)
    return Promise.all(
            candles.map(async function(candle) {
                //let a = await tulind.indicators.macd.indicator([candle.val], [12, 26, 9])
                // let mymyhist = await mymacd.histogram(candle.pip100, candle.pip100)
                // mymyhist.splice(0, 450)
                //     console.log(mymyhist)
                // let b = await tulind.indicators.rsi.indicator([candle.pip100], [14])
                //console.log(candle.pip100)
                try {
                    let [mymyhist, b] = await Promise.all([tulind.indicators.rsi.indicator([candle.pip100], [14]), mymacd.histogram(candle.pip100, candle.pip100)])
                        //console.log(b)
                        //let c = await tulind.indicators.stoch.indicator([candle.val1, candle.val2, candle.val3], [14, 3, 3])
                        //console.log(c[1][14])
                        //console.log(a[2].length)
                        //b[b.length - 1] < 35 || b[b.length - 2] < 35 || b[b.length - 3] < 35 || b[b.length - 4] < 35 || b[b.length - 5] < 35 || b[b.length - 6] < 35 || b[b.length - 7] < 35)
                        // console.log(b[b.length - 1] < 35, b[b.length - 2] < 35, b[b.length - 3] < 35, b[b.length - 4] < 35, b[b.length - 5] < 35, b[b.length - 6] < 35, b[b.length - 7] < 35)
                    if (testing(mymyhist)) {
                        //console.log({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                        console.log({ name: candle.name, hi: mymyhist[mymyhist.length - 1] })
                            //arr.push({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                            //arr.push({ name: candle.name })
                        return candle.name
                    } else {}
                } catch (err) {
                    console.log(err)
                }
                //return arr
            })).then((arr) => {
            //let r = []
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined)) {
                    console.log(5)
                    return a
                }
                //return r
            }))
        }).catch(err => console.log(err))
        //console.log(candles[0])
}

module.exports.founnd = async(size, volume) => {
    try {
        console.log(2)
        let a = await found(size, volume)
        console.log(a)
        return a
    } catch (err) {
        console.log(err)
    }
    //console.log(a[0])
}

//https://forms.gle/hwuRPE7DSn6gR3nW6