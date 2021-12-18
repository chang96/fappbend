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
const stoch = require('./taapistoch/index')
const ha = require('./HA')
const rha = require(('./rHA'))
const renko = require('./screnko').renko
const hi = require('technicalindicators/dist/index').HeikinAshi
const assert = require('assert')
const moment = require('moment-timezone')
const rsi = require('./taapiRSI/index').rsi
const macd = require('./taapi/index').histogram
const ema = require('./taapi/ema/ema')
// //module.exports = {indicator
const axios = require('axios')
const c = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'ETHBTC', 'XRPBTC', 'EOSBTC', 'ETCBTC', 'LTCBTC', 'LINKBTC', 'BNBBTC', 'XLMBTC', 'TRXBTC', 'XLMBTC', 'NEOBTC', 'XTZBTC', 'DASHBTC', 'IOTABTC',
    'QTUMBTC', 'OMGBTC', 'NANOBTC', 'KMDBTC', 'XVGBTC', 'WAVESBTC', 'ZILBTC', 'ENJBTC', 'VIBBTC', 'DLTBTC', 'DNTBTC', 'MCOBTC', 'KAVABTC', 'CELRBTC', 'MATICBTC', 'FETBTC', 'FUNBTC', 'ADABTC', 'BATBTC', 'FTMBTC', 'QLCBTC', 'GVTBTC', 'LENDBTC', 'QKCBTC', 'MFTBTC', 'BCHABCBTC', 'ONTBTC', 'ATOMBTC',
    'IOSTBTC', 'RDNBTC', 'BQXBTC', 'ARPABTC', 'CHZBTC', 'RVNBTC', 'KAVABTC', 'ZECBTC', 'IOTABTC', 'AGIBTC', 'DCRBTC', 'PIVXBTC', 'LSKBTC', 'STEEMBTC', 'BEAMBTC', 'LOOMBTC', 'THETABTC', 'XEMBTC', 'STXBTC', 'TNTBTC', 'ICXBTC', 'NULSBTC', 'TOMOBTC', 'ERDBTC', 'SNMBTC', 'MDABTC', 'GOBTC', 'WABIBTC', 'ELFBTC'
]
const coins = ['FETUSDT']
// async function ff(f){
//     let fff = await f
//     let n = {open:[],low:[], high:[], close:[], timestamp:[], volume:[]}
//     fff.forEach(c=>{
//         n.timestamp.push(Number(c[0]))
//         n.open.push(Number(c[1]))
//         n.high.push(Number(c[2]))
//         n.low.push(Number(c[3]))
//         n.close.push(Number(c[4]))
//         n.volume.push(Number(c[5]))
//     })
//     const period = 14
// const result = renko(Object.assign({}, n, {period: period, useATR:true}))
// console.log(result.close.reverse()[0])
// return result
// }
function meanDev(array, lookback, percent){
    let cap = percent * array[0]
    let arr = array.splice(0, lookback)
    let sum = arr.reduce(function(a, b, i){
        return Number (a)+ Number (b)
    })
    let avg = sum/arr.length
    console.log(avg)
    let deviation = arr.map(function(price){
        return Math.abs(Number (price) - Number (avg))
    }).reduce(function(a, b){
        return Number (a)+ Number (b)
    })
    let meanDeviation = deviation/arr.length
    console.log(meanDeviation)
    let result =  meanDeviation <= cap ? true: false
    return result
}

// console.log(meanDev(prices, 8, 0.01))
 let m = (async function() {
//     coins.map(async function(coin) {
//         let coi = await coin
//         const time = '1w'
//         let close = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${coi}&interval=${time}&limit=500`).
//         then(data => ha.HeikinAshi(data.data)).then(data => data.map(datum => (datum[3])));
//         let a = (await stoch.stochRSI(close))
//         console.log(close, coin)
//     })

try {const coin = 'ETHUSDT'
const time = '4h'
// let close = await axios.get(`https://api.binance.com/api/v3/klines?symbol=COCOSUSDT&interval=3m&limit=1000`).then(data => renko(data.data))//.then(d =>d )//[d,d.timestamp,d.close])
//.then(data => data.map(datum => (datum[4])));
let closea = await axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=1000`).then(async data =>{

//  await atr(data.data)
 return data.data
}).then(data=> data.map(datum => datum[4]))
// let n = {open:[],low:[], high:[], close:[], timestamp:[], volume:[]}
// close.forEach(c=>{
//     n.timestamp.push(Number(c[0]))
//     n.open.push(Number(c[1]))
//     n.high.push(Number(c[2]))
//     n.low.push(Number(c[3]))
//     n.close.push(Number(c[4]))
//     n.volume.push(Number(c[5]))
// })
// const period = 14
// const result = renko(Object.assign({}, n, {period: period, useATR:true}))
// console.log(close[2].reverse())                             

//console.log(close)
//const data = {"clclose
//let rr = []
//console.log(close.reverse())
//console.log(close[0].timestamp.map(t=>moment.tz(t, "Africa/Lagos").format()))
// for(let i = 0; i<close[2].length; i++){
//     console.log(close[2][i +1])
//     close[2][i + 1] - close[2][i] >=0 ? rr.push('+') :rr.push('-')
// }
// rr.pop()
// console.log(rr.reverse())

// let ranging = meanDev(closea.slice().reverse(), 10, 1/100)
let rs = await rsi([...closea], 6)
// let mac = await macd([...closea], [...closea])
let st = await stoch.stochRSI([...closea] ,6)
// console.log(mac.histogram.reverse()[0])
console.log(rs.reverse()[0])
 console.log(st.k[0])
 } catch(e){
     console.log(e)
 }

 })()


 const atr = async function (candles, ex ){
    const arrtr = candles.map(((candles, i, arr)=>{
        if(i === 0){
            let a = Number(candles[2] - candles[3])
            let b = Math.abs(Number(candles[1] - arr[0][4]))
            let c = Math.abs(Number(candles[3] - arr[0][4]))
            return Math.max(a, b, c)
        } else {
            let a = Number(candles[2] - candles[3])
            let b = Math.abs(Number(candles[1] - arr[i-1][4]))
            let c = Math.abs(Number(candles[3] - arr[i-1][4]))
            return Math.max(a, b, c)
        }
      
 })) 
 let x = await ema.see(14, 14, arrtr)
 console.log(x.ema +'kkkkkkk')
 return x
}