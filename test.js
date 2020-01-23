// require('dotenv').config()
// const Binance = require('binance-api-node').default
// const bi = Binance({
//     apiKey: process.env.APIKEY,
//     apiSecret: process.env.APISECRET,
//     // getTime: xxx // time generator function, optional, defaults to () => Date.now()
// })
// const axios = require('axios')
// const tulind = require('tulind')
//     // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
// const url = `api.binance.com`
// let others = {
//     headers: {
//         "content-type": "application/json; charset=UTF-8",
//     },
//     method: "GET",
//     data: { symbol: 'ETHUSDT', interval: '5m', limit: 10 }
// }
// let opens5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=15m&limit=18').
// then(data => data.data).then(data => data.map(datum => (datum[1])));

// // let opens5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=15m&limit=18').
// // then(data => data.data).then(data => data.map(datum => (datum[1])));

// let highs5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=15m&limit=500').
// then(data => data.data).then(data => data.map(datum => (datum[2])))

// let lows5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=15m&limit=500').
// then(data => data.data).then(data => data.map(datum => (datum[3])))
// const checkexposure = bi.accountInfo().then(info => (info.balances[2].free))

// let stochcloses5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=5m&limit=500').
// then(data => data.data).then(data => data.map(datum => (datum[4])))

// let stochhighs5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=5m&limit=500').
// then(data => data.data).then(data => data.map(datum => (datum[2])))

// let stochlows5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=5m&limit=500').
// then(data => data.data).then(data => data.map(datum => (datum[3])))

// let rsicloses5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=1h&limit=12').
// then(data => data.data).then(data => data.map(datum => (datum[4])))

// let macdcloses5 = axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=1h&limit=500').
// then(data => data.data).then(data => data.map(datum => (datum[4])))

// let histogramStore = []
// let rsiStore = []
// let bought = 1
// let indicators = (async() => {
//     //const open5 = await opens5
//     const exposure = await checkexposure
//     const macdclose5 = await macdcloses5
//     const stochhigh5 = await stochhighs5
//     const stochlow5 = await stochlows5
//     const stochclose5 = await stochcloses5
//     const rsiclose5 = await rsicloses5
//     const rsi5 = await tulind.indicators.rsi.indicator([rsiclose5], [14]);
//     const stoch5 = await tulind.indicators.stoch.indicator([stochhigh5, stochlow5, stochclose5], [14, 3, 3])
//     const macd5 = await tulind.indicators.macd.indicator([macdclose5], [12, 26, 9])
//     const useStoch = { stochk: stoch5[0][stoch5.length], stochd: stoch5[1][stoch5.length] }
//     const useRsi = { rsi: rsi5[0][rsi5.length] }
//     const useMacd = { macd: macd5[0][macd5.length], signal: macd5[1][macd5.length], histogram: macd5[2][macd5.length] }
//     const result = { RSI: useRsi, MACD: useMacd, STOCH: useStoch }
//     console.log(result)

//     console.log(rsicloses5)
//         // if (result.MACD.macd > result.MACD.signal && exposed === false) {
//         //     if (bi.accountInfo().then(time => (time.balances[11].free < 5))) {
//         //         setTimeout(indicators(), 1000 * 60 * 60 * 3)
//         //     } else {
//         //         await bi.order({
//         //             symbol: 'ETHUSDT',
//         //             type: "MARKET",
//         //             side: 'BUY',
//         //             quantity: String(bi.accountInfo().then(time => console.log(time.balances[11].free)))

//     //         })
//     //         setTimeout(indicators(), 1000 * 60 * 60 * 3)
//     //             // send msg to me
//     //         exposed = true
//     //     }
//     // } else if (result.STOCH.stochd > result.STOCH.stochk) {
//     //     await bi.order({
//     //         symbol: 'ETHUSDT',
//     //         type: 'MARKET',
//     //         side: 'SELL',
//     //         quantity: String(bi.accountInfo().then(time => console.log(time.balances[2].free)))
//     //     })
//     //     exposed = false
//     //     setTimeout(indicators(), 1000 * 60 * 60 * 3)
//     //         // send msg to me
//     // } else {
//     //     setTimeout(indicators(), 1000 * 60 * 60 * 3)
//     // }
// })()

// //module.exports = {indicator
const axios = require('axios')
const coin = 'CVCETH'
const time = '1w'
let close = axios.get(`https://api.binance.com/api/v3/klines?symbol=${coin}&interval=${time}&limit=500`).
then(data => data.data).then(data => data.map(datum => (datum[4])));
const stoch = require('./taapistoch/index')

let m = (async function() {
    console.log(await stoch.stochRSI(close))
})()